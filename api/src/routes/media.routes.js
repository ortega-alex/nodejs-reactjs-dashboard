import { Router } from 'express';
import { uploadVideo } from '../controllers/media.controller';
const _media = Router();

_media.post('/uploadVideo', uploadVideo);

export default _media;