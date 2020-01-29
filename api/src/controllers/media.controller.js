import path from 'path';
// import uuid from 'uuid/v4';
import jimp from 'jimp';

export async function uploadVideo(req, res) {
    try {
        const { files } = req;
        if (!files) {
            return res.status(200).json({
                err: false,
                msj: 'No se pudo recuperar el archivo'
            });
        } else {
            const extencion = path.extname(files.file.name);
            if (!extencion.match(/\.(mp4|mp3)$/i)) {
                return res.status(403).end();
            }
            const ruta = path.join(__dirname, '../public/videos/');
            const name = files.file.name; // uuid() + extencion;
            files.file.mv(ruta + name, (err) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json({
                    status: 'done',
                    url: 'http://localhost:8080/' + name,
                    name
                });
            });
        }
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: 'Ha ocurrido un error!'
        });
    }
}

export async function uploadImg(req, res) {
    try {
        const { files } = req;
        if (!files) {
            return res.status(200).json({
                err: false,
                msj: 'No se pudo recuperar el archivo'
            });
        } else {
            const extencion = path.extname(files.file.name);
            if (!extencion.match(/\.(jpg|png)$/i)) {
                return res.status(403).end();
            }
            const ruta = path.join(__dirname, '../public/img/');
            const name = files.file.name; // uuid() + extencion;
            await files.file.mv(ruta + name, (err) => {
                if (err) return res.status(500).json(err);
            });

            const image = await jimp.read(ruta + name);
            await image.resize(1920, jimp.AUTO);
            await image.writeAsync(ruta + name);

            return res.status(200).json({
                status: 'done',
                url: 'http://localhost:8080/' + name,
                name
            });

        }
    } catch (err) {
        res.status(500).json({
            err: true,
            msj: 'Ha ocurrido un error!'
        });
    }
}