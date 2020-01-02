import app from './config/app';
import '@babel/polyfill';

const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('./config/socket')(io, app);

async function main() {
    await http.listen(app.get('port'));
    console.log(`server on por ${app.get('port')}`);
}

main();