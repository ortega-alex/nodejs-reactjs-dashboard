import db_mysql from '../config/db_mysql';
import db_mssql from '../config/db_mssql';

export async function getSupervisores(req, res) {
    try {
        // WHERE a.id_puesto in(27, 33) 
        var strQuery = `SELECT a.primer_nombre, a.primer_apellido, a.nombre_completo, a.id_usuario_sac AS id_usuario, a.id_usuario_sac AS id_supervisor, 
                                b.id_cartera_depto, b.descripcion AS departamento
                        FROM reclutador.usuarios a
                        INNER JOIN reclutador.catCarteraDepto b ON a.id_cartera_depto = b.id_cartera_depto
                        WHERE a.id_puesto IN(27) 
                        AND a.id_estatus_usuario = 7
                        ORDER BY departamento, primer_nombre`;

        await db_mysql.pool_100.query(strQuery, (err, supervisores) => {
            if (err) return res.status(500).json({ message: err });
            return res.status(200).json({
                err: false,
                msj: 'success',
                supervisores
            });
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: 'Ha ocurrido un error!'
        });
    }
}

export async function getGestoresPorSuper(req, res) {
    try {
        const { id_supervisor } = req.params;
        if (!id_supervisor) return res.json({ err: true, msj: 'Falta informacion!' });

        var strQuery = `SELECT c.id_usuario, c.nombres, c.apellidos, c.nombre_completo
                        FROM usuarios_grupos_detalle a
                        INNER JOIN usuarios_grupos b ON a.id_grupo = b.id_grupo
                        INNER JOIN usuarios c ON a.id_usuario = c.id_usuario
                        WHERE b.id_empleado_supervisor = ${id_supervisor}
                        AND c.id_usuario NOT IN(${id_supervisor})
                        AND b.suspendido = 0
                        AND c.suspendido = 0
                        ORDER BY c.id_usuario DESC`;
        const result = await db_mssql.pool.request().query(strQuery);
        return res.status(200).json({
            message: 'success',
            gestores: result.recordset
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: "Ha ocurrido un error"
        });
    }
}