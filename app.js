require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser'); // esto es para poder usar los datos que vienen por POST
app.use(bodyParser.json()); // para análisis de cuerpo JSON
app.use(bodyParser.urlencoded({ extended: true })); // para análisis de cuerpo de formulario


/* Motor de vistas para interfaces web */
app.set('view engine', 'ejs');
/*
Ruta para servir archivos estáticos desde la carpeta 'assets'
Esto también se conoce como middleware
*/
app.use(express.static(__dirname + '/views'));
// cancele la de abajo porque sino no me toma la ruta de index desde todos los archivos
// app.use('/assets', express.static(__dirname + '/views/assets'));
// app.get('/', (req, res) => res.send('<h1>Tu primer API!</h1>'));





//agregamos middlewares para usar las rutas

//Vistas
app.use(require('./routes/index'));
app.use(require('./routes/endpoints'));
app.use(require('./routes/help'));

//Endpoints
app.use(require('./routes/profesores'));
// app.use(require('./routes/materias'));
app.use(require('./routes/notas'));
app.use(require('./routes/alumnos'));


//endpoints de pruebas, ignorenlos
app.use(require('./routes/productos'));
// app.use(require('./routes/contactos'));








app.use((req, res, next) =>{
     res.status(404).send('<h1>Not Found</h1>');
})
/*La aplicación queda escuchando y también dá una respuesta en la consola 
para facilitarnos las pruebas y el acceso a la web*/
app.listen(port, () => console.log(`app listening at: http://localhost:${port}/`));