import { Router } from 'express';
import { login, update_session, loginAsignacion } from '../controllers/user.controller';
const _user = Router();

_user.post('/login', login);
_user.post('/update', update_session);
_user.post('/asignacion', loginAsignacion);

export default _user;