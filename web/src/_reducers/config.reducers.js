import { ConfigConstants } from '../_constants/index';
import Function from '../_helpers/Function';

export default function _config(state = {}, action) {
    switch (action.type) {
        case ConfigConstants.CONF_REQUEST:
            return {
                ...state
            }
        case ConfigConstants.CONF_FAILURE:
            Function.message('error', action.err.toString());
            return {
                ...state
            }
        case ConfigConstants.GET_TRNS_SUCCESS:
            return {
                ...state,
                transiciones: action.transiciones
            } 
        case ConfigConstants.CONF_SAVE:
            Function.message("info", action.msj.toString());
            return {
                ...state,
                transiciones: undefined
            }
        case ConfigConstants.GET_TVS_SUCCESS:
            return {
                ...state,
                tvs: action.tvs
            }     
        default:
            return state
    }
}