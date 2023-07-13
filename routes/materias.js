const express = require('express');
const router = express.Router()
//const mysql = require('mysql');
const { db_local, db_real } = require('../db');

const connection = db_local;

//Funcion reutlizable para obtener todos los recursos y por paginacion tambien
async function obtenerRecursos(req, res) {
    try {
    const { page, pageSize } = req.query;

      // Verificar si se proporcionaron los parámetros de paginación
    if (page && pageSize) {
        const offset = (page - 1) * pageSize;
        const query = `SELECT * FROM materias LIMIT ${pageSize} OFFSET ${offset}`;
        const resultadoConsulta = await new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
            console.log(err);
            reject(err);
            } else {
            resolve(result);
            }
        });
    });

        if (resultadoConsulta.length === 0) {
        res.status(404).json({ error: 'No se encontraron recursos' });
        } else {
        res.status(200).json({ message: 'Recursos obtenidos correctamente', data: resultadoConsulta });
        }
    } else {
        // Consulta SQL para obtener todos los recursos sin paginación
        const query = 'SELECT * FROM materias';

        const resultadoConsulta = await new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
            console.log(err);
            reject(err);
            } else {
            resolve(result);
            }
        });
        });

        if (resultadoConsulta.length === 0) {
        res.status(404).json({ error: 'No se encontraron recursos' });
        } else {
        res.status(200).json({ message: 'Recursos obtenidos correctamente', data: resultadoConsulta });
        }
    }
    } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener los recursos' });
    }
}

// async function obtenerRecursos(req, res) {
//     try {
//         const query = 'SELECT * FROM materias';

//         const result = await new Promise((resolve, reject) => {
//         connection.query(query, (err, result) => {
//             if (err) {
//             console.log(err);
//             reject(err);
//             } else {
//             resolve(result);
//             }
//             });
//         });

//         if (result.length === 0) {
//             res.status(404).json({ error: 'No se encontraron recursos' });
//         } else {
//             res.status(200).json({ message: 'Recursos obtenidos correctamente', data: result });
//         }
//         } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Error al obtener los recursos' });
//         }
//     }

// Obtener todas las materias
// router.get('/materias', (req, res) => {
//     const query = 'SELECT * FROM materias';
//     connection.query(query, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Error al obtener los recursos' });
//         } else {
//             res.send(result);
//             res.status(200).json({ message: 'Recursos obtenidos correctamente' });
//         }
//     });
// });

//Funcion reutlizable para Obtener recurso mediante ID
async function obtenerRecursoId(req, res) {
    try {
    const { id_materia } = req.params;
    const query = `SELECT * FROM materias WHERE id = ?`;

    const result = await new Promise((resolve, reject) => {
        connection.query(query, [id_materia], (err, result) => {
        if (err) {
            console.log(err);
            reject(err);
        } else {
            resolve(result);
        }
        });
    });

    if (result.length === 0) {
        res.status(404).json({ error: 'Recurso no encontrado' });
    } else {
        res.status(200).json({ message: 'Recurso obtenido correctamente mediante el id', data: result });
    }
    } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al obtener el recurso por id' });
    }
}

//Obtener materia por ID
// router.get('/materias/:id', (req, res) => {
//     const { id } = req.params;
//     const query = `SELECT * FROM materias WHERE id ='${id}'`;
//     connection.query(query, (err, result) => {
//     if (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Error al obtener el recurso por id' });
//     } else {
//         res.send(result);
//         res.status(200).json({ message: 'Recurso obtenido correctamente mediante el id' });
//     }
//     console.log(result);
//     });
// });

//Funcion reutlizable para crear un nuevo registro
async function crearRecurso(req, res) {
    try {
    const { nombre_materia } = req.body;
    const query = 'INSERT INTO materias (nombre_materia) VALUES (?)';
    await connection.query(query, [nombre_materia]);

    res.status(200).json({ message: 'Recurso creado correctamente' });
    } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al crear el recurso' });
    }
}

// Agregar una materia
// router.post('/materias', (req, res) => {
//     const {name, description} = req.body;
//     const query = `INSERT INTO materias VALUES ('default','${name}','${description}')`; 
//     connection.query(query, (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).json({ error: 'Error al agregar el recurso' });
//         } else {
//             console.log('Insercion correcta');
//             res.status(200).json({ message: 'Recurso agregado correctamente' });
//         }
//     });
// });




//Función reutilizable para actualizar un registro
async function actualizarRecurso(req, res) {
    try {
    const id = req.params.id_materia;
    const { nombre_materia } = req.body;
    const query = 'UPDATE materias SET nombre_materia = ? WHERE id_materia = ?';
    await connection.query(query, [nombre_materia, id]);

    res.send('Recurso actualizado correctamente');
    } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al actualizar el recurso' });
    }
}

// //Actualizar una materia por ID
// router.patch('/materias/:id', (req, res) => {
//     const id = req.params.id;
//     const { name, description } = req.body;
//     const query = 'UPDATE materias SET name = ?, description = ? WHERE id = ?';
//     connection.query(query, [name, description, id], (err, result) => {
//     if (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Error al actualizar el recurso' });
//     } else {
//         res.status(200).json({ message: 'Recurso actualizado correctamente' });
//     }
//     });
// });

// Función reutilizable para eliminar el recurso
async function eliminarRecurso(req, res) {
    try {
    const id = req.params.id_materia;
    const query = 'DELETE FROM materias WHERE id_materia = ?';
    await connection.query(query, [id]);

    res.json({ message: 'Recurso eliminado correctamente' });
    } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error al eliminar el recurso' });
    }
}

// //Eliminar materia por ID
// router.delete('/materias/:id', (req, res) => {
//     const {id} = req.params;
//     const query = `DELETE FROM materias WHERE id ='${id}'`;
//     connection.query(query, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({ error: 'Error al eliminar el recurso' });
//         } else {
//             res.send(result);
//             res.status(200).json({ message: 'Recurso eliminado correctamente' });
//         }
//     });
// });

// Utilizar la función en diferentes endpoints

router.get('/materias', obtenerRecursos); 
router.get('/materias/:id', obtenerRecursoId);
router.post('/materias', crearRecurso); 
router.patch('/materias/:id', actualizarRecurso);
router.delete('/materias/:id', eliminarRecurso);
//router.put('/materias/:id', actualizarRecurso);


// router.put('/materias/:id', (req, res) => {
//     const query = 'UPDATE materias SET name = ?, description = ? WHERE id = ?';
//     connection.query(query, [req.body.name, req.body.description, req.params.id], (err, result) => {
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