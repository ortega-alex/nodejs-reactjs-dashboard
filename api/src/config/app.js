import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';

import _user from '../routes/user.routers';
import _indicador from '../routes/indicador.routers';
import _media from '../routes/media.routes';
import _config from '../routes/config.routers';

import db_mssql from './db_mssql';
import db_mysql from './db_mysql';

require('custom-env').env();

// initialization
const app = express();
db_mssql.connection();
db_mysql.connection_100();

// setings
app.set('port', process.env.PORT || 4000);

// midlewares
app.use(morgan('dev'));
app.use(json());
app.use(cors());
app.use(fileUpload({
    createParentPnth: true
}));

//routes
app.use('/api/user', _user);
app.use('/api/indicador', _indicador);
app.use('/api/multimedia', _media);
app.use('/api/config', _config);

//static files
app.use(express.static(path.join( path.join(__dirname, '../') , 'public')));

export default app;