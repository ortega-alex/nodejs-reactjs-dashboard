import io from 'socket.io-client';
import _server from '../_services/server.services';
import { ConfigConstants } from '../_constants/index';
import http from '../_services/http.services';

const socket = io(_server._url + _server._port);

function request() { return { type: ConfigConstants.CONF_REQUEST } }
function failure(err) { return { type: ConfigConstants.CONF_FAILURE, err } }
function get_success_transiciones(transiciones) { return { type: ConfigConstants.GET_TRNS_SUCCESS, transiciones } }
function save_success(msj) { return { type: ConfigConstants.CONF_SAVE, msj } }
function get_success_tvs(tvs) { return { type: ConfigConstants.GET_TVS_SUCCESS, tvs } }

function getTransiciones(id_operacion) {
    return dispatch => {
        dispatch(request());
        http._GET("config/transiciones/" + id_operacion).then(res => {
            dispatch(get_success_transiciones(res.transiciones));
        }).catch(err => {
            dispatch(failure(err));
        });
    }
}

function putTransiciones(data) {
    return dispatch => {
        dispatch(request());
        http._PUT('config/transiciones', data).then(res => {
            dispatch(save_success(res.msj));
            if (res.err == false) {
                socket.emit('actualizar');
            }
        }).catch(err => {
            dispatch(failure(err));
        })
    }
}

function getTvs() {
    return dispatch => {
        dispatch(request());
        http._GET("config/tvs").then(res => {
            dispatch(get_success_tvs(res.tvs));
        }).catch(err => {
            dispatch(failure(err));
        });
    }
}

const ConfigActions = {
    getTransiciones,
    putTransiciones,
    getTvs
};

export default ConfigActions;