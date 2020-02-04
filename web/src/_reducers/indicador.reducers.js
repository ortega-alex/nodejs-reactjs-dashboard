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
                supervisores: action.supervisores,
                indicadores: undefined,
            }
        case IndicadorConstants.GET_GTR_SUCCESS:
            return {
                ...state,
                indicadores: action.data.indicadores,
                top_primeros_3: action.data.top_primeros_3,
                top_ultimos_3: action.data.top_ultimos_3,
                tiempo_transiciones: action.data.tiempo_transiciones,
                total_transiciones: action.data.total_transiciones
            }
        default:
            return state
    }
}