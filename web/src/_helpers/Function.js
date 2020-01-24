import { message as Message } from 'antd';
const _URL_IMG = "http://apps.ocacall.oca/reclutador/arch/";
const arr_logos = { 
    4 : require('../media/promerica.png'),
    12 : require('../media/bi.png'),
    13 : require('../media/bac.png'),
    18 : require('../media/promerica.png'),
    33 : require('../media/gyt.png')
};

function message(typo, menssage) {
    Message[typo](menssage);
}

function remplazarEspacios_(val) {
    return val.replace(/ /g, '_');
}

function getImage(name) {
    // var path = remplazarEspacios_(name.trim());
    return _URL_IMG + name;//+ ".jpg";
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
    // return meta <= 33 ? '#f44336' : (meta <= 66 ? '#f9a825' : '#66bb6a');
    return meta <= 20 ? '#BF4346' : (meta <= 40 ? '#E9662C' : ( meta <= 60 ? '#FFED6A' : (meta <= 95 ? '#52A72E' : '#4A95DF')));
}

function getLogoDepartamento(id_departamento) {       
    return arr_logos[id_departamento] ? arr_logos[id_departamento] : '';
}

const Function = {
    message,
    remplazarEspacios_,
    getImage,
    getFondo,
    ordenarArrDesc,
    commaSeparateNumber,
    colorPorcentaje,
    getLogoDepartamento
}

export default Function;
