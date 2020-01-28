import { Router } from 'express';
import { screenshot } from '../controllers/puppeteer.controller';
const _puppeteer = Router();

_puppeteer.get('/screenshot', screenshot);

export default _puppeteer;