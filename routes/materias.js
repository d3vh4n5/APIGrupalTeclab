// const express = require('express');
// const router = express.Router()
// //const mysql = require('mysql');

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

// // Obtener todas las materias
// router.get('/materias', (req, res) => {
//     const query = 'SELECT * FROM materias';
//     //connection.query(query, (err, results) => {
//     if (err) {
//         console.error('Error al obtener las materias: ', err);
//         res.status(500).json({ error: 'Error al obtener las materias' });
//     } else {
//         res.json(results);
//     }
//     });
// //});

// // Agregar una materia

// router.post('/materias', (req, res) => {
//     const { nombre, descripcion } = req.body;
//     const query = 'INSERT INTO materias (nombre, descripcion) VALUES (?,?)';
//     //connection.query(query, [nombre, descripcion], (err, result) => {
//         if (err) {
//             console.error('Error al agregar la materia: ', err);
//             res.status(500).json({ error: 'Error al agregar la materia' });
//         } else {
//             res.json({ message: 'Materia agregada exitosamente' });
//         }
//     });
// //});


// // Actualizar una materia por ID
// router.patch('/materias/:id', (req, res) => {
//     const { id } = req.params;
//     const { nombre, descripcion } = req.body;
//     const query = 'UPDATE materias SET nombre = ?, descripcion = ? WHERE id = ?';
//     //connection.query(query, [nombre, descripcion, id], (err, result) => {
//     if (err) {
//         console.error('Error al actualizar la materia: ', err);
//         res.status(500).json({ error: 'Error al actualizar la materia' });
//     } else {
//         res.json({ message: 'Materia actualizada exitosamente' });
//     }
//     });
// //});

// // Eliminar una materia por ID

// // router.delete('/materias/:id', (req, res) => {
// //     const { id } = req.params;
// //     const query = 'DELETE FROM materias WHERE id =?';
// //     connection.query(query, [id], (err, result) => {
// //     if (err) {
// //         console.error('Error al eliminar la materia: ', err);
// //         res.status(500).json({ error: 'Error al eliminar la materia' });
// //     } else {
// //         res.json({ message: 'Materia eliminada exitosamente' });
// //     }
// //     });
// // });























module.exports = router;