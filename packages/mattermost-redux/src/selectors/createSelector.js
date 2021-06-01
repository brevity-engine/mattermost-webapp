// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';
import {generateId} from 'mattermost-redux/utils/helpers';

let creator;

// Direct copy from reselect needed as it's not exported.
function defaultEqualityCheck(a, b) {
    return a === b
}

// Direct copy from reselect needed as it's not exported.
function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
        return false
    }

    // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
    const length = prev.length
    for (let i = 0; i < length; i++) {
        if (!equalityCheck(prev[i], next[i])) {
            return false
        }
    }

    return true
}

// memoizeAndMeasure is a modified function of defaultMemoize from reselect.
// The only change is it takes a "measure" function as second argument which is called
// any time the memoized function is called, regardless as to whether it returned a
// memoized result or not.
const memoizeAndMeasure = (func, measure, equalityCheck = defaultEqualityCheck) => {
    let lastArgs = null
    let lastResult = null
    // we reference arguments instead of spreading them for performance reasons
    return function () {
        if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
            // apply arguments instead of spreading for performance.
            lastResult = func.apply(null, arguments)
        }

        if (measure) {
            measure();
        }
        lastArgs = arguments
        return lastResult
    }
}

// Direct copy from reselect needed as it's not exported.
function getDependencies(funcs) {
    const dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs

    if (!dependencies.every(dep => typeof dep === 'function')) {
        const dependencyTypes = dependencies.map(
            dep => typeof dep
        ).join(', ')
        throw new Error(
            'Selector creators expect all input-selectors to be functions, ' +
            `instead received the following types: [${dependencyTypes}]`
        )
    }

    return dependencies
}

const trackedSelectors = {};

// createSelectorCreator is modified function of the one from reselect with added tracking for measuring memoization effectiveness.
function createSelectorCreator(memoize, ...memoizeOptions) {
    return (name, ...funcs) => {
        const id = generateId();
        let recomputations = 0;
        let calls = 0;
        const resultFunc = funcs.pop();
        const dependencies = getDependencies(funcs);

        const memoizedResultFunc = memoize(
            function() {
                recomputations++
                // apply arguments instead of spreading for performance.
                return resultFunc.apply(null, arguments)
            },
            null,
            ...memoizeOptions
        );

        // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
        const selector = memoize(function () {
            const params = [];
            const length = dependencies.length;

            for (let i = 0; i < length; i++) {
                // apply arguments instead of spreading and mutate a local list of params for performance.
                params.push(dependencies[i].apply(null, arguments));
            }

            // apply arguments instead of spreading for performance.
            return memoizedResultFunc.apply(null, params);
        },
        function() {
            calls++
        });

        selector.resultFunc = resultFunc;
        selector.dependencies = dependencies;
        selector.recomputations = () => recomputations;
        selector.resetRecomputations = () => recomputations = 0;
        selector.calls = () => calls;
        selector.resetCalls = () => calls = 0;
        selector.effectiveness = () => 100 - ((recomputations / calls) * 100);
        selector.selectorName = () => name;
        selector.id = () => id;
        trackedSelectors[id] = selector;
        return selector;
    };
}

// resetTrackedSelectors resets all the measurements for memoization effectiveness.
function resetTrackedSelectors() {
    Object.values(trackedSelectors).forEach((selector) => {
        selector.resetCalls();
        selector.resetRecomputations();
    });
}

// getSortedTrackedSelectors returns an array, sorted by effectivness, containing mesaurement data on all tracked selectors.
function getSortedTrackedSelectors() {
    let selectors = Object.values(trackedSelectors);
    selectors = selectors.map((selector) => ({name: selector.selectorName(), effectiveness: selector.effectiveness(), recomputations: selector.recomputations(), calls: selector.calls()}));
    selectors.sort((a, b) => (a.effectiveness > b.effectiveness) ? 1 : ((b.effectiveness > a.effectiveness) ? -1 : 0))
    return selectors;
}

// dumpTrackedSelectorsStatistics prints to console a table containing the measurement data on all tracked selectors.
function dumpTrackedSelectorsStatistics() {
    const selectors = getSortedTrackedSelectors();
    console.table(selectors); //eslint-disable-line no-console
}

// Only track selectors in development builds.
if (process.env.NODE_ENV === 'development') { //eslint-disable-line no-process-env
    creator = createSelectorCreator(memoizeAndMeasure);
    window.dumpTrackedSelectorsStatistics = dumpTrackedSelectorsStatistics;
    window.resetTrackedSelectors = resetTrackedSelectors;
    window.getSortedTrackedSelectors = getSortedTrackedSelectors;
} else {
    // Discard name argument in production when using unmodified createSelector
    creator = (name, ...funcs) => createSelector(...funcs);
}

export default creator;
