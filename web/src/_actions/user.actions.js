import { AsyncStorage } from 'AsyncStorage';

import { UserConstants } from '../_constants/index';
import http from '../_services/http.services';

function request() { return { type: UserConstants.REQUEST } }
function failure(err) { return { type: UserConstants.FAILURE, err } }
function warning(msj) { return { type: UserConstants.WARNING, msj } }
function success(msj) { return { type: UserConstants.SUCCESS, msj } }

function login(data) {
    return dispatch => {
        dispatch(request());
        http._POST("user/login", data).then(res => {
            if (res.err == true) {
                dispatch(warning(res.msj));
            } else {
                dispatch(success(res.msj));
                AsyncStorage.setItem('login_dashboard', JSON.stringify(res.user)).then(() => {
                    window.location.reload();
                });
            }
        }).catch(err => {
            dispatch(failure(err));
        });
    }
}

function changePass(data) {
    return dispatch => {
        dispatch(request());
        http._PUT("user/restart", data).then(res => {
            if (res.err == 'true') {
                dispatch(warning(res.msj));
            } else {
                dispatch(success(res.msj));
            }
        }).catch(err => {
            dispatch(failure(err));
        });
    }
}

function loginUpdate(data) {
    return dispatch => {
        dispatch(request());
        http._POST("user/update", data).then(res => {
            if (res.err == false) {
                AsyncStorage.setItem('login_dashboard', JSON.stringify(res.user)).then(() => {
                    window.location.reload();
                });
            }
        }).catch(err => {
            dispatch(failure(err));
        });
    }
}


function logout() {
    AsyncStorage.setItem('login_dashboard', undefined).then(() => {
        window.location.reload();
    });
    return { type: UserConstants.LOGOUT };
}

const UsuarioActions = {
    login,
    changePass,
    logout,
    loginUpdate
};

export default UsuarioActions;