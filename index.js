import express from 'express';
import fileUpload from 'express-fileupload';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload({
    limits: {
        fileSize: 24000000,
        fieldNameSize: 24000
    }
}));

app.get('/form', (req, res) => {
    res.send(`<html>
    <head>
        <title>Cargar</title>
    </head>
    <body>
        <form action = "http://localhost:3000/upload" method = "POST" enctype = "multipart/form-data">
        Archivo: <input type = "file" name = "file"><br>
        <input type = "submit" value = "Subir">
        </form>
    </body>
    </html>`)
})

app.post('/upload', async (req, res) => {
   
   let archivo = req.files.file;
   if(archivo.mimetype == 'image/png' && archivo.size <= 3000000){
    archivo.name = 'img1.jpg';
    await archivo.mv(`./files/${archivo.name}`);
    res.send("Archivo Recibido");
   }else{
    console.log("Error Formato Archivo 1");
    res.sendStatus(400)
   }    
});


app.listen(3000, () => {
    console.log('Servidor levantado en puerto 3000')
})