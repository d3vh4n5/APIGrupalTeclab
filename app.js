require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const profesores = require('./api/profesores');

/*
Ruta para servir archivos estáticos desde la carpeta 'assets'
Esto también se conoce como middleware
*/
// app.use(express.static(__dirname + '/views'));
app.use('/assets', express.static(__dirname + '/views/assets'));
// app.get('/', (req, res) => res.send('<h1>Tu primer API!</h1>'));





//agregamos un middleware para usar las rutas
app.use(require('./router'));








app.use((req, res, next) =>{
     res.status(404).send('<h1>Not Found</h1>');
})
/*La aplicación queda escuchando y también dá una respuesta en la consola 
para facilitarnos las pruebas y el acceso a la web*/
app.listen(port, () => console.log(`app listening at: http://localhost:${port}/`));