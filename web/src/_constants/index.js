const UserConstants = {
    REQUEST: 'REQUEST',
    FAILURE: 'FAILURE',
    WARNING: 'WARNING',
    SUCCESS: 'SUCCESS'
};

const IndicadorConstants = {
    IND_REQUEST: 'IND_REQUEST',
    IND_FAILURE: 'IND_FAILURE',
    GET_SPR_SUCCESS: 'GET_SPR_SUCCESS', // SUPERVISORES
    GET_GTR_SUCCESS: 'GET_GTR_SUCCESS' // GESTORES
};

const ConfigConstants = {
    CONF_REQUEST: 'CONF_REQUEST',
    CONF_FAILURE: 'CONF_FAILURE',
    GET_TRNS_SUCCESS: 'GET_TRNS_SUCCESS',
    CONF_SAVE: 'CONF_SAVE',
    GET_TVS_SUCCESS: 'GET_TVS_SUCCESS',
};

export {
    UserConstants,
    IndicadorConstants,
    ConfigConstants
};