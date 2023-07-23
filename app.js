require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const key = process.env.KEY
const bodyParser = require('body-parser'); // esto es para poder usar los datos que vienen por POST
app.use(bodyParser.json()); // para análisis de cuerpo JSON
app.use(bodyParser.urlencoded({ extended: true })); // para análisis de cuerpo de formulario


// Habilitar CORS para todas las solicitudes
// app.use(cors());

// Habilitar CORS específicas:
app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     next();
});


/* Motor de vistas para interfaces web */
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));// Este middleware será la carpeta para todos los archivos estáticos, y vistas


// Middleware para verificar la variable "key"
// app.use((req, res, next) => {
//      const expectedKey = key;
//      const receivedKey = req.query.key;
   
//      if (!receivedKey || receivedKey !== expectedKey) {
//        return res.status(400).send('La variable "key" es necesaria y debe tener el valor correcto.');
//      }

//      next();
// });


//agregamos middlewares para usar las rutas

//Vistas
app.use(require('./routes/index'));
app.use(require('./routes/endpoints'));

//Endpoints
app.use(require('./routes/profesores'));
app.use(require('./routes/materias'));
app.use(require('./routes/notas'));
app.use(require('./routes/alumnos'));
app.use(require('./routes/usuarios'));
app.use(require('./routes/login'));


/* Fin de los middlewares de rutas*/






app.use((req, res, next) =>{
     res.status(404).sendFile(__dirname +'/views/html/404.html');
})
/*La aplicación queda escuchando y también dá una respuesta en la consola 
para facilitarnos las pruebas y el acceso a la web*/
app.listen(port, () => console.log(`app listening at: http://localhost:${port}/`));