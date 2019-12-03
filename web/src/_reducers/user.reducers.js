import { UserConstants } from '../_constants/index';
import Function from '../_helpers/Function';

export default function _usuarios(state = {}, action) {
    switch (action.type) {
        case UserConstants.REQUEST:
            return {
                ...state
            }
        case UserConstants.FAILURE:
            Function.message('error', action.err.toString());
            return {
                ...state
            }
        case UserConstants.WARNING:
            Function.message("warning", action.msj.toString());
            return {
                ...state
            }
        case UserConstants.SUCCESS:
            Function.message("success", action.msj.toString());
            return {
                ...state
            }
        default:
            return state
    }
}