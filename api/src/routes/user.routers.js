import { Router } from 'express';
import { login, update_session } from '../controllers/user.controller';
const _user = Router();

_user.post('/login', login);
_user.post('/update', update_session);

export default _user;