import { Router } from 'express';
import { login } from '../controllers/user.controller';
const _user = Router();

_user.post('/login', login);

export default _user;