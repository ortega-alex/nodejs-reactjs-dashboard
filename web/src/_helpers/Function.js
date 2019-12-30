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
        4: 'fondo-promerica',
        12: 'fondo-bi',
        13: 'fondo-rojo',
        18: 'fondo-promerica',
        33: 'fondo-rojo',
    };
    return (arr[id_dep]) ? arr[id_dep] : 'fondo-default';
}

const Function = {
    message,
    remplazarEspacios_,
    getImage,
    getFondo
}

export default Function;
