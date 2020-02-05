--*************************************************************************--
-- TIEMPO DE TRANSICIONES POR LUGAR, GRUPO Y TOP 3 DETERMINADO POR SEGUNDOS--
-- MARLON ORTEGA --
--*************************************************************************--

CREATE TABLE proyector.dbo.transiciones_pantallas (
	id_transiciones_pantallas int IDENTITY(0,1) NOT NULL,
	ip_operacion int NOT NULL,
	sg_lugar int NOT NULL,
	sg_grupo int NOT NULL,
	sg_top int NOT NULL,
    id_usuario int NOT NULL,
    fecha_creacion datetime DEFAULT getdate() NULL
) GO;

--**************************************************************************--