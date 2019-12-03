import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import _user from '../routes/user.routers';
import db_mssql from './db_mssql';

require('custom-env').env();

// initialization
const app = express();
db_mssql.connection();

// setings
app.set('port', process.env.PORT || 4000);

// midlewares
app.use(morgan('dev'));
app.use(json());
app.use(cors());

//routes
app.use('/api/user' , _user);

export default app;