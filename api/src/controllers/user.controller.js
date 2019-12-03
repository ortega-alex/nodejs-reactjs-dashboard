import db_mssql from '../config/db_mssql';
// import db_mysql from '../config/db_mysql';

export function encryptPassword(pass) {
    var sum = 0;
    for (let i = 0; i < pass.length; i++) {
        sum += pass.charCodeAt(i);
    }
    return sum;
}

export async function login(req, res) {
    try {
        const { usuario, pass } = req.body;
        if (!usuario && !pass) return res.json({ err: true, message: "usuario y contrasenia requerida" });
        const _pass = encryptPassword(pass);
        var strQuery = `SELECT id_usuario, nombre_completo,
                                CASE
                                    WHEN password != ${_pass} THEN 1
                                    WHEN suspendido = 1 THEN 2
                                    ELSE 0
                                END AS estado
                        FROM usuarios
                        WHERE login = '${usuario}'`;

        const result = await db_mssql.pool.request().query(strQuery);
        if (!result) return res.status(500).json({ err: true, msj: "ocurrio un error" });
        if (result && result.rowsAffected[0] == 0) return res.json({ err: true, msj: 'Usuario incorecto' });

        const user = result.recordset[0];
        var responce = { err: true };
        if ( user.estado == 1 ) {
            responce.msj = "Contraseña incorrecta";
        } else if ( user.estado == 2 ) {
            responce.msj = "El usuario esta";
        } else {
            var date = new Date();
            var fecha = new Date(date.setDate(date.getDate() + 1));
            user.fecha = fecha;

            responce.err = false;
            responce.msj = "Sesion iniciada correctamente";           
            responce.user = user;
        }
        res.status(200).json(responce);
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: 'somethunf foes wrong ' + err,
            user: {}
        });
    }
}