import db_mssql from '../config/db_mssql';
import db_mysql from '../config/db_mysql';
import { encryptPassword } from '../config/helper';
const json = require('../config/tv.json');

export async function login(req, res) {
    try {
        const { usuario, pass } = req.body;
        if (!usuario || !pass) return res.json({ err: true, message: "usuario y contrasenia requerida" });

        if (usuario == 'tv') return res.status(200).json({
            err: false,
            msj: "Sesion iniciada correctamente",
            user: json.usuarios[pass]
        });

        const _pass = encryptPassword(pass);
        var strQuery = `SELECT id_usuario, nombre_completo AS nombre, nombres, apellidos,
                                CASE
                                    WHEN suspendido = 1 THEN 2
                                    WHEN password != ${_pass} THEN 1
                                    ELSE 0
                                END AS estado,                            
                                CASE
                                    WHEN id_usuario IN( 35, 47, 625, 971, 1070, 1120, 1232, 1606, 2287, 2490 ) THEN 1
                                    ELSE 0
                                END AS cargo
                        FROM oca_sac..usuarios
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
            user.primer_nombre = user.nombres.split(' ')[0];
            user.primer_apellido = user.apellidos.split(' ')[0];
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

export async function update_session(req, res) {
    try {
        const { id_usuario } = req.body;
        if (!id_usuario) return res.json({ err: true, message: "usuario requerida" });
        var strQuery = `SELECT id_usuario, nombre_completo AS nombre, nombres, apellidos,
                                CASE
                                    WHEN id_usuario IN( 35, 47, 625, 971, 1070, 1120, 1232, 1606, 2287, 2490 ) THEN 1
                                    ELSE 0
                                END AS cargo
                        FROM oca_sac..usuarios
                        WHERE id_usuario = ${id_usuario}`;

        const result = await db_mssql.pool.request().query(strQuery);
        if (!result) return res.status(500).json({ err: true, msj: "ha ocurrido un error" });
        if (result && result.rowsAffected[0] == 0) return res.json({ err: true, msj: 'Usuario incorecto' });

        var user = result.recordset[0];
        strQuery = `SELECT a.id_cartera_depto,
                            b.descripcion
                    FROM reclutador.usuarios a
                    INNER JOIN reclutador.catCarteraDepto b ON a.id_cartera_depto = b.id_cartera_depto
                    WHERE a.id_usuario_sac = ${id_usuario}`;

        await db_mysql.pool_100.query(strQuery, (err, _res) => {
            if (err) return res.status(500).json({ err: true, msj: "Ha ocurrido un erroal al momento de realizar la consulta" });

            user.id_cartera_depto = _res[0].id_cartera_depto;
            user.departamento = _res[0].descripcion;
            user.primer_nombre = user.nombres.split(' ')[0];
            user.primer_apellido = user.apellidos.split(' ')[0];
            var cookie = new Date().getTime();
            res.status(200).json({
                err: false,
                msj: "Actualizacion de datos realizada exitosamente",
                user,
                cookie
            });
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: "Ha ocurrido un error"
        });
    }
}


export async function loginAsignacion(req, res) {
    try {
        const { id_usuario, id_tv } = req.body;
        if (!id_usuario || id_tv < 0) return res.json({ err: true, message: "television y usuario requerido" });

        var strQuery = `SELECT id_usuario, nombre_completo AS nombre, nombres, apellidos
                        FROM oca_sac..usuarios
                        WHERE id_usuario ='${id_usuario}'`;

        const result = await db_mssql.pool.request().query(strQuery);
        var user = result.recordset[0];

        strQuery = `SELECT a.id_cartera_depto,
                            b.descripcion
                    FROM reclutador.usuarios a
                    INNER JOIN reclutador.catCarteraDepto b ON a.id_cartera_depto = b.id_cartera_depto
                    WHERE a.id_usuario_sac = ${id_usuario}`;

        await db_mysql.pool_100.query(strQuery, (err, _res) => {
            if (err) return res.status(500).json({ err: true, msj: "Ha ocurrido un erroal al momento de realizar la consulta" });

            user.id_cartera_depto = _res[0].id_cartera_depto;
            user.departamento = _res[0].descripcion;
            user.primer_nombre = user.nombres.split(' ')[0];
            user.primer_apellido = user.apellidos.split(' ')[0];
            user.cargo = 0;
            user.id_tv = id_tv;
            res.status(200).json({
                err: false,
                msj: "Asignación realizada exitosamente!",
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