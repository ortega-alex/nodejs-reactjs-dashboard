module.exports = function (io, app) {

    io.on('connection', (socket) => {
        socket.on('enviar-a-todos', (values) => {
            io.emit('todos', values);
        });

        socket.on('individual', (values) => {
            const { supervisores } = values;
            supervisores.forEach(element => {
                io.emit(`${element}`, values);
            });
        });

        socket.on('cambiar-tema', (values) => {
            io.emit('tema', values);
        });

        socket.on('actualizar', () => {
            io.emit('autualizar-secion');
        });
    });
}