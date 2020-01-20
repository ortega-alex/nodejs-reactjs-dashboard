import { message as Message } from 'antd';
const _URL_IMG = "http://apps.ocacall.oca/reclutador/arch/";

function message(typo, menssage) {
    Message[typo](menssage);
}

function remplazarEspacios_(val) {
    return val.replace(/ /g, '_');
}

function getImage(name) {
    var path = remplazarEspacios_(name.trim());
    return _URL_IMG + path + ".jpg";
}

function getFondo(id_dep) {
    const arr = {
        1: 'fondo-primer-success',
        2: 'fondo-primer-info',
        3: 'fondo-primer-danger', 
        4: 'fondo-primer-warning'     
    };
    return (arr[id_dep]) ? arr[id_dep] : 'fondo-default';
}

function ordenarArrDesc(arr, name) {
    arr.sort(function (a, b) {
        if (a[name] < b[name]) {
            return 1;
        }
        if (a[name] > b[name]) {
            return -1;
        }
        return 0;
    });
    return arr;
}

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) { val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2'); }
    return val;
}

function colorPorcentaje(meta){
    return meta <= 33 ? '#f44336' : (meta <= 66 ? '#f9a825' : '#66bb6a');
}

const Function = {
    message,
    remplazarEspacios_,
    getImage,
    getFondo,
    ordenarArrDesc,
    commaSeparateNumber,
    colorPorcentaje
}

export default Function;
