// @author : Juan Angel Basgall - https://www.linkedin.com/in/juanangelbasgall/

require('dotenv').config()
const mysql = require('mysql');

const db_local = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
const db_real = mysql.createConnection({
    host: process.env.DB2_HOST,
    user: process.env.DB2_USER,
    password: process.env.DB2_PASS,
    database: process.env.DB2_NAME,
    port: process.env.DB2_PORT
});

const datos = async (my_query) => {
	return new Promise((resolve, reject) => {
		db_local.query(my_query, (error, results) => {
			if (error) {
                // resolve(error)
                resolve('error')
                console.log(error);
				reject(error);
			} else {
				resolve(results); // El resolve seria igual al return, pero es para funcion async
			}
		});
	});
};

// ATENCION: Aparentemente los metodos de .connect y .end()/.destroy() ya no se usan, en su lugar solo se usa el .query() directamente

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
    db_real: db_real,
    datos: datos
};