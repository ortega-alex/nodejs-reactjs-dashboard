import { Router } from 'express';
import { getSupervisores, getGestoresPorSuper } from '../controllers/indicador.controler';
const _indicador = Router();

_indicador.get('/get_supers', getSupervisores);
_indicador.get('/get_gestores/:id_supervisor', getGestoresPorSuper);

export default _indicador;