import db_mysql from '../config/db_mysql';
import db_mssql from '../config/db_mssql';
import { ordenarArrDesc, ordenarArrAcs } from '../config/helper';

export async function getSupervisores(req, res) {
    try {
        strQuery = `SELECT a.id_usuario_supervisor AS id_supervisor,
                            a.generacion_diaria as generacion, 
                            a.recuperacion_acumulada AS recuperacion, 
                            b.dir_foto,
                            (	SELECT top 1 Meta_Mensual 
                                FROM proyector..proyector_diario_metas_usuarios 
                                WHERE id_usuario = a.id_usuario_supervisor 
                                ORDER BY id DESC) AS meta
                    FROM proyector..proyector_diario_top10_supervisores a 
                    LEFT JOIN oca_sac..usuario_fotografia b ON a.id_usuario_supervisor = b.id_usuario
                    WHERE a.id = (	SELECT TOP 1 c.id 
                                    FROM proyector..proyector_diario_top10_supervisores C
                                    WHERE c.id_usuario_supervisor = a.id_usuario_supervisor
                                    ORDER BY c.ef_no_cuentas_actuales DESC)`;
        var result = await db_mssql.pool.request().query(strQuery);
        var indicadores = result.recordset;

        // WHERE a.id_puesto in(27, 33) 
        var strQuery = `SELECT a.primer_nombre, a.primer_apellido, a.nombre_completo, a.id_usuario_sac AS id_supervisor, 
                                b.id_cartera_depto, b.descripcion AS departamento
                        FROM reclutador.usuarios a
                        INNER JOIN reclutador.catCarteraDepto b ON a.id_cartera_depto = b.id_cartera_depto
                        WHERE a.id_puesto IN(27) 
                        AND a.id_estatus_usuario = 7
                        AND a.id_usuario_sac NOT IN(206,625, 1456) 
                        ORDER BY departamento, primer_nombre`;
        await db_mysql.pool_100.query(strQuery, (err, supervisores) => {
            if (err) return res.status(500).json({ message: err });

            var _supervisores = [];
            supervisores.forEach(element => {
                indicadores.forEach(indicador => {
                    if (element.id_supervisor == indicador.id_supervisor) {
                        _supervisores.push({
                            id_usuario: element.id_supervisor,
                            id_cartera_depto: element.id_cartera_depto,
                            primer_nombre: element.primer_nombre,
                            primer_apellido: element.primer_apellido,
                            nombre_completo: element.nombre_completo,
                            departamento: element.departamento,
                            generacion: Math.round(parseFloat(indicador.generacion)),
                            recuperacion: Math.round(parseFloat(indicador.recuperacion)),
                            meta: indicador.meta > 0 ? (indicador.recuperacion * 100) / indicador.meta : 0,
                            foto: indicador.dir_foto
                        })
                    }
                })
            });

            return res.status(200).json({
                err: false,
                msj: 'success',
                supervisores: _supervisores
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

        var indicadores = [
            { tipo: 'Q', titulo: 'Recuperación acumulada del mes', desc: 'Total del mes por equipo:', total: 0, gestores: [] },
            { tipo: 'Q', titulo: 'Generación de promesas del mes', desc: 'Total del mes por equipo:', total: 0, gestores: [] },
            { tipo: '', titulo: 'Controles del día', desc: 'Total por día del equipo:', total: 0, gestores: [] }
        ];
        
        var strQuery = ` SELECT a.id_usuario,
                                SUM(a.generacion_diaria) AS generacion, 
                            (SELECT SUM(total_controles)
                            FROM proyector..proyector_diario_controles_x_hora
                            WHERE id_usuario = a.id_usuario
                            GROUP BY id_usuario) AS controles,
                            SUM(a.recuperacion_acumulada) AS recuperacion, 
                            b.nombres, b.apellidos, b.nombre_completo,
                            c.dir_foto AS foto,
                            (	SELECT top 1 Meta_Mensual 
                                FROM proyector..proyector_diario_metas_usuarios 
                                WHERE id_usuario = a.id_usuario 
                                ORDER BY id DESC) AS meta
                        FROM proyector..proyector_diario_top10 a
                        INNER JOIN oca_sac..usuarios b ON a.id_usuario = b.id_usuario
                        LEFT JOIN oca_sac..usuario_fotografia c ON b.id_usuario = c.id_usuario
                        WHERE  a.id_usuario_supervisor = ${id_supervisor}
                        GROUP BY a.id_usuario, b.nombres, b.apellidos, b.nombre_completo, c.dir_foto`
        var result = await db_mssql.pool.request().query(strQuery);
        var arr = result.recordset;
        arr.forEach(element => {
            // recuperacion
            indicadores[0].gestores.push({
                id_usuario: element.id_usuario,
                nombres: element.nombres,
                apellidos: element.apellidos,
                nombre_completo: element.nombre_completo,
                foto: element.foto,
                indicador: Math.round(parseFloat(element.recuperacion)),
                meta: element.meta > 0 ? (element.recuperacion * 100) / element.meta : 0,
            });

            // generacion
            indicadores[1].gestores.push({
                id_usuario: element.id_usuario,
                nombres: element.nombres,
                apellidos: element.apellidos,
                nombre_completo: element.nombre_completo,
                foto: element.foto,
                indicador: Math.round(parseFloat(element.generacion)),
                meta: element.meta > 0 ? (element.generacion * 100) / element.meta : 0
            });

            // controles
            indicadores[2].gestores.push({
                id_usuario: element.id_usuario,
                nombres: element.nombres,
                apellidos: element.apellidos,
                nombre_completo: element.nombre_completo,
                foto: element.foto,
                indicador: (element.controles && element.controles != '' && element.controles != null) ? element.controles : 0,
                meta: element.controles > 0 ? (element.controles * 100) / 60 : 0,
            });

            indicadores[0].total += Math.round(parseFloat(element.recuperacion));
            indicadores[1].total += Math.round(parseFloat(element.generacion));
            indicadores[2].total += (element.controles && element.controles != '' && element.controles != null) ? parseInt(element.controles) : 0;
        });

        ordenarArrDesc(indicadores[0].gestores, 'indicador');
        ordenarArrDesc(indicadores[1].gestores, 'indicador');
        ordenarArrDesc(indicadores[2].gestores, 'indicador');

        strQuery = `SELECT CASE 
                            WHEN a.recuperacion_acumulada IS NULL THEN 0
                            ELSE a.recuperacion_acumulada
                        END AS indicador,
                        b.id_usuario, b.nombres, b.apellidos,
                        c.dir_foto AS foto,
                        d.id_usuario AS id_supervisor, d.nombres AS nombres_super, d.apellidos AS apellidos_super,
                        e.dir_foto AS foto_super,
                        f.id_grupo_producto AS id_producto, f.grupo_producto AS producto
                    FROM proyector..proyector_diario_top10 a
                    INNER JOIN oca_sac..usuarios b ON a.id_usuario = b.id_usuario
                    LEFT JOIN oca_sac..usuario_fotografia c ON b.id_usuario = c.id_usuario
                    INNER JOIN oca_sac..usuarios d ON a.id_usuario_supervisor = d.id_usuario
                    LEFT JOIN oca_sac..usuario_fotografia e ON d.id_usuario = e.id_usuario
                    INNER JOIN proyector..proyector_diario_grupos_productos f ON a.id_grupo_producto = f.id_grupo_producto
                    WHERE a.id = (  SELECT top 1 c.id
                                    FROM proyector..proyector_diario_top10 c 
                                    WHERE a.id_usuario = c.id_usuario
                                    order by ef_no_cuentas_actuales desc)
                    AND a.id_grupo_producto IN( SELECT id_grupo_producto
                                                FROM proyector..proyector_diario_top10_supervisores
                                                WHERE id_usuario_supervisor = ${id_supervisor})
                    ORDER BY indicador DESC`;

        var result = await db_mssql.pool.request().query(strQuery);
        var arr = result.recordset;
        var ultimos_3 = arr.length > 0 ? arr.length - 4 : 0;
        var top_primeros_3 = [];
        var top_ultimos_3 = [];
        arr.forEach((element, i) => {
            if (i <= 2) {
                top_primeros_3.push(element);
            }

            if (i > ultimos_3) {
                top_ultimos_3.push(element);
            }
        });

        ordenarArrAcs(top_ultimos_3, 'indicador');

        return res.status(200).json({
            message: 'success',
            indicadores,
            top_primeros_3,
            top_ultimos_3
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: "Ha ocurrido un error"
        });
    }
}