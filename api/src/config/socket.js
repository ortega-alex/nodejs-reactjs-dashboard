module.exports = function (io, app) {

    io.on('connection', (socket) => {

        console.log("User connected");

        socket.on('enviar-a-todos', (values) => {
            console.log(values);
            // const { mensaje, duracion } = values;
            // socket.mensaje = mensaje;
            io.emit('todos', values);
        });

        socket.on('individual', (values) => {
            console.log(values);
            const { supervisores } = values;
            // socket.mensaje = mensaje;
            supervisores.forEach(element => {
                io.emit(`${element}`, values);
            });
        });

        // socket.on('change-config', (id_supervisor) => {
        //     io.emit(`change-config-${id_supervisor}`, {});
        // });
    });
}