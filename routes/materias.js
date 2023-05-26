// const express = require('express');
// const router = express.Router()
// //const mysql = require('mysql');
const { db_local, db_real } = require('../db');

const connection = db_local;

// // Configurar la conexión a la base de datos
// // const connection = mysql.createConnection({
// //     host: 'localhost',
// //     user: 'usuario_db',
// //     password: 'contraseña_db',
// //     database: 'nombre_db',
// // });

// //   // Conectar a la base de datos
// //     connection.connect((err) => {
// //     if (err) {
// //         console.error('Error de conexión a la base de datos: ', err);
// //     } else {
// //         console.log('Conexión exitosa a la base de datos');
// //     }
// // });

// Obtener todas las materias
router.get('/materias', (req, res) => {
    const query = 'SELECT * FROM materias';
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al obtener los recursos' });
        } else {
            res.send(result);
            res.status(200).json({ message: 'Recursos obtenidos correctamente' });
        }
    });
});

//Obtener materia por ID
router.get('/materias/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM materias WHERE id ='${id}'`;
    connection.query(query, (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al obtener el recurso por id' });
    } else {
        res.send(result);
        res.status(200).json({ message: 'Recurso obtenido correctamente mediante el id' });
    }
    console.log(result);
    });
});


// Agregar una materia
router.post('/materias', (req, res) => {
    const {name, description} = req.body;
    const query = `INSERT INTO materias VALUES ('default','${name}','${description}')`; 
    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al agregar el recurso' });
        } else {
            console.log('Insercion correcta');
            res.status(200).json({ message: 'Recurso agregado correctamente' });
        }
    });
});

// //Actualizar una materia por ID
router.patch('/materias/:id', (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    const query = 'UPDATE materias SET name = ?, description = ? WHERE id = ?';
    connection.query(query, [name, description, id], (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).json({ error: 'Error al actualizar el recurso' });
    } else {
        res.status(200).json({ message: 'Recurso actualizado correctamente' });
    }
    });
});

//Eliminar materia por ID
router.delete('/materias/:id', (req, res) => {
    const {id} = req.params;
    const query = `DELETE FROM materias WHERE id ='${id}'`;
    connection.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al eliminar el recurso' });
        } else {
            res.send(result);
            res.status(200).json({ message: 'Recurso eliminado correctamente' });
        }
    });
});

// router.put('/materias/:id', (req, res) => {
//     const query = 'UPDATE materias SET name = ? WHERE id = ?';
//     connection.query(query, [req.body.name, req.params.id], (err, result) => {
//     if (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Error al actualizar el recurso por id' });
//     } else {
//         res.send(result);
//         res.status(200).json({ message: 'Recurso actualizado correctamente por id' });
//     }
//     console.log(result);
//     });
// });

module.exports = router;