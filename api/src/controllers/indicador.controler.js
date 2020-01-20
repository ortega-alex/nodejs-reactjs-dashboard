import db_mysql from '../config/db_mysql';
import db_mssql from '../config/db_mssql';
import { ordenarArrDesc, ordenarArrAcs } from '../config/helper';

export async function getSupervisores(req, res) {
    try {
        strQuery = `SELECT id_usuario_supervisor AS id_supervisor, 
                    SUM(generacion_hoy) as generacion, 
                    SUM(recuperacion_acumulada) AS recuperacion, 
                    SUM(proyeccion) AS proyeccion
                    FROM proyector..proyector_diario_top10_supervisores 
                    GROUP BY  id_usuario_supervisor`;
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
                    if ( element.id_supervisor == indicador.id_supervisor ) {
                        _supervisores.push({
                            id_supervisor: element.id_supervisor,
                            id_cartera_depto: element.id_cartera_depto,
                            primer_nombre: element.primer_nombre,
                            primer_apellido: element.primer_apellido,
                            nombre_completo: element.nombre_completo,
                            departamento: element.departamento,
                            generacion: indicador.generacion,
                            recuperacion: indicador.recuperacion,
                            meta: (indicador.recuperacion * 100) / indicador.proyeccion
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
            { tipo: '#', titulo: 'Ranking', descr: 'Breve descripción acerca del indicador', total: 0, gestores: [] },
            { tipo: '#', titulo: 'Ranking', descr: 'Breve descripción acerca del indicador', total: 0, gestores: [] },
            { tipo: '#', titulo: 'Controles', descr: 'Breve descripción acerca del indicador', total: 0, gestores: [] }, 
            { tipo: 'Q', titulo: 'Generación', descr: 'Breve descripción acerca del indicador', total: 0, gestores: [] },
            { tipo: 'Q', titulo: 'Recuperación Acumulada', descr: 'Breve descripción acerca del indicador', total: 0, gestores: [] }          
        ];
 
        var strQuery = `SELECT a.id_usuario, 
                                CASE 
                                    WHEN a.generacion_hoy IS NULL THEN 0
                                    ELSE a.generacion_hoy
                                END AS generacion, 
                                a.generacion_proyectada,
                                CASE 
                                    WHEN a.controles IS NULL THEN 0
                                    ELSE a.controles
                                END AS controles, 
                                CASE 
                                    WHEN a.recuperacion_acumulada IS NULL THEN 0
                                    ELSE a.recuperacion_acumulada
                                END AS recuperacion,
                                a.proyeccion,
                                convert(varchar(8),rank) AS posicion,
		                        convert(varchar(4),conteo_grupo) as de,
                                b.nombres, b.apellidos, b.nombre_completo
                        FROM proyector..proyector_diario_top10 a
                        INNER JOIN oca_sac..usuarios b ON a.id_usuario = b.id_usuario
                        WHERE a.id = ( SELECT top 1 c.id
                                        FROM proyector..proyector_diario_top10 c 
                                        WHERE a.id_usuario = c.id_usuario
                                        order by ef_no_cuentas_actuales desc)
                        AND a.id_usuario_supervisor = ${id_supervisor}`;
        var result = await db_mssql.pool.request().query(strQuery);
        var arr = result.recordset;
        arr.forEach(element => {
            indicadores[0].gestores.push({ 
                id_usuario: element.id_usuario,
                nombres: element.nombres, 
                apellidos: element.apellidos,   
                nombre_completo: element.nombre_completo,
                indicador: parseInt(element.posicion)
            });
            indicadores[1].gestores.push({ 
                id_usuario: element.id_usuario,
                nombres: element.nombres, 
                apellidos: element.apellidos,   
                nombre_completo: element.nombre_completo,
                indicador: parseInt(element.posicion)
            });
            indicadores[2].gestores.push({ 
                id_usuario: element.id_usuario,
                nombres: element.nombres, 
                apellidos: element.apellidos,   
                nombre_completo: element.nombre_completo,
                indicador: element.controles
            });
            indicadores[3].gestores.push({ 
                id_usuario: element.id_usuario,
                nombres: element.nombres, 
                apellidos: element.apellidos,   
                nombre_completo: element.nombre_completo,
                indicador: parseFloat(parseFloat(element.generacion).toFixed(2)),
                meta: (element.generacion * 100) / element.generacion_proyectada
            });
            indicadores[4].gestores.push({ 
                id_usuario: element.id_usuario,
                nombres: element.nombres, 
                apellidos: element.apellidos,   
                nombre_completo: element.nombre_completo,
                indicador: parseFloat(parseFloat(element.recuperacion).toFixed(2)),
                meta: (element.recuperacion * 100) / element.proyeccion
            });           
            indicadores[0].total = parseInt(element.de);
            indicadores[1].total = parseInt(element.de);
            indicadores[2].total += parseInt(element.controles);
            indicadores[3].total += parseFloat(parseFloat(element.generacion).toFixed(2));
            indicadores[4].total += parseFloat(parseFloat(element.recuperacion).toFixed(2));            
        });

        ordenarArrAcs(indicadores[0].gestores, 'indicador');
        ordenarArrAcs(indicadores[1].gestores, 'indicador');
        ordenarArrDesc(indicadores[2].gestores, 'indicador');
        ordenarArrDesc(indicadores[3].gestores, 'indicador');
        ordenarArrDesc(indicadores[4].gestores, 'indicador');
       
        return res.status(200).json({
            message: 'success',
            indicadores
        });
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: "Ha ocurrido un error"
        });
    }
}