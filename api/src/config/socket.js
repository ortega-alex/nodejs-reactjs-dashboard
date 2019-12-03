module.exports = function (io, app) {

    io.on('connection', (socket) => {
        socket.on('enviar-a-todos', (values) => {
            const { mensaje, duracion } = values;
            socket.mensaje = mensaje;
            io.emit('todos', { mensaje, duracion });
        });

        socket.on('individual', (values) => {
            const { mensaje, duracion, supervisores } = values;
            socket.mensaje = mensaje;
            supervisores.forEach(element => {
                io.emit(`${element}`, { mensaje, duracion });
            });
        });

        socket.on('change-config', (id_supervisor) => {
            io.emit(`change-config-${id_supervisor}`, {});
        });
    });
}