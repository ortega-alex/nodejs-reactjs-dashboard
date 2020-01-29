import db_mssql from '../config/db_mssql';
import db_mysql from '../config/db_mysql';
import { encryptPassword } from '../config/helper';

export async function login(req, res) {
    try {
        const { usuario, pass } = req.body;
        if (!usuario && !pass) return res.json({ err: true, message: "usuario y contrasenia requerida" });
        const _pass = encryptPassword(pass);
        var strQuery = `SELECT id_usuario, nombre_completo AS nombre,
                                CASE
                                    WHEN suspendido = 1 THEN 2
                                    WHEN password != ${_pass} THEN 1
                                    ELSE 0
                                END AS estado,                            
                                CASE
                                    WHEN id_usuario IN( 35, 47, 625, 971, 1070, 1120, 1232, 1606, 2287, 2490 ) THEN 1
                                    ELSE 0
                                END AS cargo
                        FROM usuarios
                        WHERE login = '${usuario}'`;

        const result = await db_mssql.pool.request().query(strQuery);
        if (!result) return res.status(500).json({ err: true, msj: "ha ocurrido un error" });
        if (result && result.rowsAffected[0] == 0) return res.json({ err: true, msj: 'Usuario incorecto' });

        var user = result.recordset[0];
        if (user.estado == 1) return res.json({ err: true, msj: "Contraseña incorrecta" });
        if (user.estado == 2) return res.json({ err: true, msj: "El usuario esta suspendido" });

        strQuery = `SELECT a.id_cartera_depto,
                            b.descripcion
                    FROM reclutador.usuarios a
                    INNER JOIN reclutador.catCarteraDepto b ON a.id_cartera_depto = b.id_cartera_depto
                    WHERE a.id_usuario_sac = ${user.id_usuario}`;

        await db_mysql.pool_100.query(strQuery, (err, _res) => {
            if (err) return res.status(500).json({ err: true, msj: "Ha ocurrido un erroal al momento de realizar la consulta" });

            user.id_cartera_depto = _res[0].id_cartera_depto;
            user.departamento = _res[0].descripcion;
            res.status(200).json({
                err: false,
                msj: "Sesion iniciada correctamente",
                user
            });
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: "Ha ocurrido un error"
        });
    }
}