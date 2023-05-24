const express = require('express');
const app = express();
const port = 3000;
const profesores = require('./api/profesores');

/*Ruta para servir archivos estáticos desde la carpeta 'assets'
Esto también se conoce como middleware
*/
app.use('/assets', express.static(__dirname + '/views/assets'));
// app.get('/', (req, res) => res.send('<h1>Tu primer API!</h1>'));
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));



// Ejemplo de solicitud de tipo get
app.get("/productos", (req,res) => {
    const productos = [
         {
    id: 1,
    name: "Martillo",
         },
         {
    id: 2,
    name: "Destornillador",
         },
         ,
         {
    id: 3,
    name: "Pinza",
         },
       ];
    res.json(productos);
    })

app.get('/profesores', (req, res) => {
    res.json(profesores);
})








/*La aplicación queda escuchando y también dá una respuesta en la consola 
para facilitarnos las pruebas y el acceso a la web*/
app.listen(port, () => console.log(`app listening at: http://localhost:${port}/`));