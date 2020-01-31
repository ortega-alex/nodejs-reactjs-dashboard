import _server from './server.services';
const _URL = `${_server._url}${_server._port}/api/`;
const _HEADERS = {
    'Content-Type': 'application/json'
}

const http = {
    _POST,
    _GET,
    _PUT
}

function _PUT(_url, _data) {
    return fetch(_URL + _url, {
        method: 'PUT',
        headers: _HEADERS,
        body: JSON.stringify(_data)
    }).then(handleResponse);
}

function _POST(_url, _data) {
    return fetch(_URL + _url, {
        method: 'POST',
        headers: _HEADERS,
        body: JSON.stringify(_data)
    }).then(handleResponse);
}

function _GET(_url) {
    return fetch(_URL + _url, {
        method: 'GET',
        headers: _HEADERS
    }).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export default http;