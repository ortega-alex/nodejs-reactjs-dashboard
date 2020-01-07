import { IndicadorConstants } from '../_constants/index';
import Function from '../_helpers/Function';

export default function _indicador(state = {}, action) {
    switch (action.type) {
        case IndicadorConstants.IND_REQUEST:
            return {
                ...state
            }
        case IndicadorConstants.IND_FAILURE:
            Function.message('error', action.err.toString());
            return {
                ...state
            }
        case IndicadorConstants.GET_SPR_SUCCESS:
            return {
                ...state,
                supervisores: action.supervisores
            }
        case IndicadorConstants.GET_GTR_SUCCESS:
            return {
                ...state,
                indicadores: action.data.indicadores
            }
        default:
            return state
    }
}