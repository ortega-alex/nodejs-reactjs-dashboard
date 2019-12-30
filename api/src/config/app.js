import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import _user from '../routes/user.routers';
import _indicador from '../routes/indicador.routers';

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

//routes
app.use('/api/user' , _user);
app.use('/api/indicador' , _indicador);

export default app;