/**
 * @author: Juan
 */

const express = require('express');
const router = express.Router()
const { db_local, db_real, datos} = require('../db');


async function consultar(query){
    return new Promise((resolve, reject)=>{
        db_local.query(query, (error, results)=>{
            if (error){
                console.log(error)
                reject(error)
            } else {
                resolve(results)
            }
        });
    });
};

// async function armadoDeRespuesta(pageSize = null, offset = null){

//     let query = `
//         SELECT alumnos.*, cursos.nombre AS nombre_curso, materias.nombre AS nombre_materia, materias.id AS id_materia
//         FROM alumnos
//         LEFT JOIN cursos ON alumnos.curso = cursos.id
//         LEFT JOIN materias_alumnos ON alumnos.id = materias_alumnos.alumno
//         LEFT JOIN materias ON materias_alumnos.materia = materias.id 
//         LIMIT ${pageSize} OFFSET ${offset}
//     `;

//     // if(pageSize !== null && offset !==null)
//     //     query = query + `LIMIT ${pageSize} OFFSET ${offset}`;
//     console.log(query)

//     const resp = await consultar(query)

//     return resp.reduce((alumnos, alumno)=>{
//         const alumnoExistente = alumnos.find(a => a.id === alumno.id)
//         const materia = {
//             id: alumno.id_materia,
//             nombre: alumno.nombre_materia
//         }

//         if (alumnoExistente){
//             alumnoExistente.materias.push(materia)
//         } else {
//             const nuevoAlumno = {
//                 id: alumno.id,
//                 nombre: alumno.nombre,
//                 apellido: alumno.apellido,
//                 dni: alumno.dni,
//                 curso: { id: alumno.curso, nombre: alumno.nombre_curso },
//                 usuario_relacionado: alumno.usuario_relacionado,
//                 materias: [materia]
//             };
//             alumnos.push(nuevoAlumno);
//         }

//         return alumnos;
//     }, [])
// }

async function armadoDeRespuesta(query){

    const alumnos = await consultar(query)
    const materias = await consultar("SELECT * FROM materias")
    const cursos = await consultar("SELECT * FROM cursos")
    const materias_alumnos = await consultar("SELECT * FROM materias_alumnos")

    return alumnos.map(alumno=>{
        alumno.curso = cursos.find(curso => curso.id === alumno.curso)
        let materiasAlumno = []
        materias_alumnos.forEach(mat=>{
            if (mat.alumno === alumno.id) materiasAlumno.push(mat)
        })

        alumno.materias = materiasAlumno.map(ma=>{
            let laMateria = materias.find(mat => mat.id === ma.materia)
            return laMateria
        })
        return alumno
    })

}


async function obtenerAlumnos(req, res){
    const { page, pageSize } = req.query;

    try{
        let resultadoConsulta = []

        if(page && pageSize){
            const offset = (page - 1) * pageSize;

            const query = `
                SELECT *
                FROM alumnos
                LIMIT ${pageSize} OFFSET ${offset};
            `;
            resultadoConsulta = await armadoDeRespuesta(query)

        } else {
            const query = "SELECT * FROM alumnos"
            resultadoConsulta = await armadoDeRespuesta(query)
        }


        console.log(resultadoConsulta)

        if (resultadoConsulta.length === 0) {
            res.status(404).json({ error: 'No se encontraron recursos' });
        } else {
            res.status(200).json(resultadoConsulta);
        }
        

    } catch (err){
        console.log(err);
        res.status(500).json({ error: 'Error al obtener los recursos' });
    }
}

async function obtenerAlumno (req, res){
    const { id } = req.params
    
    try {
        const query = `SELECT * FROM alumnos WHERE id=${id};`
        const resp = await consultar(query)

        if (resp[0]){
            res.status(200).json(resp)
        } else {
            res.status(404).json({ error: "Alumno inexistente" })
        }

    } catch (e){
        res.status(500).json({ error: "Hubo un error en el servidor" })
    }
}

async function crearAlumno(req, res){
    const { nombre, apellido, dni, curso, materias } = req.body;

    try{
        const query = `
            INSERT INTO alumnos VALUES (default, '${nombre}', '${apellido}', '${dni}', '${curso}',null)
        `
        const resp = await consultar(query);
        console.log(resp)


        res.status(200).json({ message: "Alumno insertado correctamente", alumno: { id: resp.insertId, nombre, apellido, dni, curso }, operation: resp });


    }catch(e){
        res.status(500).json({error: "Hubo un error en el servidor"})
    }
}

const actualizarAlumno = async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, dni, curso} = req.body

    const query = `
        UPDATE alumnos
        SET nombre='${nombre}', apellido='${apellido}', dni='${dni}', curso='${curso}'
        WHERE id=${id};
    `;

    console.log(query)

    try {
        const resp = await consultar(query);
        res.status(200).json({message: "Operación realizada con éxito", resp, alumno: { id, nombre, apellido, dni, curso}})
    } catch (error) {
        res.status(500).json({error: "Hubo un error en el servidor"})
    }
}

// const eliminarAlumno = async (req, res) => {
//     const { id } = req.params

//     const query = `
//         DELETE 
//         FROM alumnos
//         WHERE id='${id}'
//     `
//     try {
//         const resp = await consultar(query)
//         res.status(200).json({message: "Operación realizada con éxito", resp})
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({error: "Hubo un error en el servidor"})
//     }
// }


router.get('/alumnos', obtenerAlumnos)
router.get('/alumnos/:id', obtenerAlumno)
router.post('/alumnos', crearAlumno)
router.put('/alumnos/:id', actualizarAlumno)
// router.delete('/alumnos/:id', eliminarAlumno)


 


module.exports = router;