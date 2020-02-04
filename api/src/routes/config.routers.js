import { Router } from 'express';
import { getTransiciones, updateTransiciones, getTelevisores } from '../controllers/config.controler';
const _config = Router();

_config.get('/transiciones/:id_operacion', getTransiciones);
_config.put('/transiciones', updateTransiciones);
_config.get('/tvs', getTelevisores);

export default _config;