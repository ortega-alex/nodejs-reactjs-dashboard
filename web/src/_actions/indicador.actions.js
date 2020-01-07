import { IndicadorConstants } from '../_constants/index';
import http from '../_services/http.services';

function request() { return { type: IndicadorConstants.IND_REQUEST } }
function failure(err) { return { type: IndicadorConstants.IND_FAILURE, err } }
function get_success_super(supervisores) { return { type: IndicadorConstants.GET_SPR_SUCCESS, supervisores } }
function get_success_gestores(data) { return { type: IndicadorConstants.GET_GTR_SUCCESS, data } }

function getSupervisores() {
    return dispatch => {
        dispatch(request());
        http._GET("indicador/get_supers").then(res => {
            dispatch(get_success_super(res.supervisores));
        }).catch(err => {
            dispatch(failure(err));
        });
    }
}

function getGestoresSupervisor(id_suoervisor) {
    return dispatch => {
        dispatch(request());
        http._GET("indicador/get_gestores/" + id_suoervisor).then(res => {
            dispatch(get_success_gestores(res));
        }).catch(err => {
            dispatch(failure(err));
        });
    }
}

const IndicadorActions = {
    getSupervisores,
    getGestoresSupervisor
};

export default IndicadorActions;