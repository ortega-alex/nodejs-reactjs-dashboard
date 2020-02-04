import db_mssql from '../config/db_mssql';
const json = require('../config/tv.json');

export async function getTransiciones(req, res) {
    try {
        const { id_operacion } = req.params;
        var strQuery = `SELECT sg_lugar, sg_grupo, sg_top 
                        FROM proyector..transiciones_pantallas
                        WHERE id_operacion = ${id_operacion}`;
        var result = await db_mssql.pool.request().query(strQuery);
        return res.status(200).json({
            err: false,
            msj: 'success',
            transiciones: result.recordset[0]
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: 'Ha ocurrido un error!'
        });
    }
}

export async function updateTransiciones(req, res) {
    try {
        const { id_operacion, sg_lugar, sg_grupo, sg_top } = req.body;
        if (!id_operacion || !sg_lugar || !sg_grupo || !sg_top) return res.json({ err: true, message: "Todos los campos son obligatorios!" });
        var strQuery = `UPDATE proyector..transiciones_pantallas
                        SET sg_lugar = ${sg_lugar}, 
                            sg_grupo = ${sg_grupo}, 
                            sg_top = ${sg_top} 
                        WHERE id_operacion = ${id_operacion}
                        AND id_transiciones_pantallas > 0`;
        var result = await db_mssql.pool.request().query(strQuery);
        return res.status(200).json({
            err: false,
            msj: 'Transiciones actualizadas exitosamente!'
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: 'Ha ocurrido un error!'
        });
    }
}

export async function getTelevisores(req, res) {
    try {
        return res.status(200).json({
            err: false,
            msj: 'success',
            tvs: json.usuarios
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: 'Ha ocurrido un error!'
        });
    }
}