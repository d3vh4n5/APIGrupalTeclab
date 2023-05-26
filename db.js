require('dotenv').config()
const mysql = require('mysql');

const db_local = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
const db_real = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});



//Con el metodo .connect() establecemos la conexión a la base de datos

// db_local.connect(error => {
//     if (error) {
//         throw error
//     }
//     else {console.log('Conexión establecida con la base de datos');}
// })

//Con el método query() hacemos las querys

// db_local.query('SELECT * FROM profesores', (error, results) =>{
//     if (error) { throw error}

//     console.log(results[0].nombre);
// })

// db_local.destroy(console.log('Conexión terminada')) esto es para destruir la conexión, sinó queda conectado


module.exports = {
    db_local: db_local,
    db_real: db_real
};