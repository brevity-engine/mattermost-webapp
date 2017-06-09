// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import keyMirror from 'utils/key_mirror';

export default keyMirror({
    GET_INCOMING_HOOKS_REQUEST: null,
    GET_INCOMING_HOOKS_SUCCESS: null,
    GET_INCOMING_HOOKS_FAILURE: null,

    CREATE_INCOMING_HOOK_REQUEST: null,
    CREATE_INCOMING_HOOK_SUCCESS: null,
    CREATE_INCOMING_HOOK_FAILURE: null,

    DELETE_INCOMING_HOOK_REQUEST: null,
    DELETE_INCOMING_HOOK_SUCCESS: null,
    DELETE_INCOMING_HOOK_FAILURE: null,

    UPDATE_INCOMING_HOOK_REQUEST: null,
    UPDATE_INCOMING_HOOK_SUCCESS: null,
    UPDATE_INCOMING_HOOK_FAILURE: null,

    GET_OUTGOING_HOOKS_REQUEST: null,
    GET_OUTGOING_HOOKS_SUCCESS: null,
    GET_OUTGOING_HOOKS_FAILURE: null,

    CREATE_OUTGOING_HOOK_REQUEST: null,
    CREATE_OUTGOING_HOOK_SUCCESS: null,
    CREATE_OUTGOING_HOOK_FAILURE: null,

    DELETE_OUTGOING_HOOK_REQUEST: null,
    DELETE_OUTGOING_HOOK_SUCCESS: null,
    DELETE_OUTGOING_HOOK_FAILURE: null,

    UPDATE_OUTGOING_HOOK_REQUEST: null,
    UPDATE_OUTGOING_HOOK_SUCCESS: null,
    UPDATE_OUTGOING_HOOK_FAILURE: null,

    GET_CUSTOM_TEAM_COMMANDS_REQUEST: null,
    GET_CUSTOM_TEAM_COMMANDS_SUCCESS: null,
    GET_CUSTOM_TEAM_COMMANDS_FAILURE: null,

    ADD_COMMAND_REQUEST: null,
    ADD_COMMAND_SUCCESS: null,
    ADD_COMMAND_FAILURE: null,

    EDIT_COMMAND_REQUEST: null,
    EDIT_COMMAND_SUCCESS: null,
    EDIT_COMMAND_FAILURE: null,

    DELETE_COMMAND_REQUEST: null,
    DELETE_COMMAND_SUCCESS: null,
    DELETE_COMMAND_FAILURE: null,

    REGEN_COMMAND_TOKEN_REQUEST: null,
    REGEN_COMMAND_TOKEN_SUCCESS: null,
    REGEN_COMMAND_TOKEN_FAILURE: null,

    RECEIVED_INCOMING_HOOK: null,
    RECEIVED_INCOMING_HOOKS: null,
    DELETED_INCOMING_HOOK: null,
    RECEIVED_OUTGOING_HOOK: null,
    RECEIVED_OUTGOING_HOOKS: null,
    DELETED_OUTGOING_HOOK: null,
    RECEIVED_CUSTOM_TEAM_COMMANDS: null,
    RECEIVED_COMMAND: null,
    RECEIVED_COMMAND_TOKEN: null,
    DELETED_COMMAND: null
});
