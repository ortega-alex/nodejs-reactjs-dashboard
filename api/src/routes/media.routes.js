import { Router } from 'express';
import { uploadVideo, uploadImg } from '../controllers/media.controller';
const _media = Router();

_media.post('/uploadVideo', uploadVideo);
_media.post('/upload_img', uploadImg);

export default _media;