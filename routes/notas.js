// @author : Juan Angel Basgall - https://www.linkedin.com/in/juanangelbasgall/

const express = require('express');
const router = express.Router()
const { db_local, db_real, datos } = require('../db');

router.get('/notas', async (req, res) => {
	const page = +req.query.page; //tomo las variables despies del ? de la url
	const pageSize = +req.query.pageSize;
    try{
        let notas = await datos('SELECT * FROM notas')
        const profesores = await datos('SELECT * FROM profesores')
        const alumnos = await datos('SELECT * FROM alumnos')
        const cuatrimestres = await datos('SELECT * FROM cuatrimestres')
        const materias = await datos('SELECT * FROM materias')
        const cursos = await datos('SELECT * FROM cursos')
        if (notas === 'error'){ 
            return  res.status(404).send('Hubo un error')
        } else{
            for (nota of notas){
                nota.profesor = profesores.find( p => p.id == nota.profesor)
                nota.profesor.materia = materias.find( m => m.id == nota.profesor.materia)
                nota.alumno = alumnos.find( a => a.id == nota.alumno)
                nota.alumno.curso = cursos.find(c => c.id == nota.alumno.curso)
                nota.cuatrimestre = cuatrimestres.find( c => c.id == nota.cuetrimestre)
                nota.materia = materias.find( m => m.id == nota.materia)
                nota.curso = cursos.find( c => c.id == nota.curso)
            }
            if (page && pageSize) {
                const start = (page - 1) * pageSize;
                const end = start + pageSize;
                console.log('Ejecutado método get paginado de notas');
                res.status(200).json(notas.slice(start, end));
            } else {
                console.log('Ejecutado método get de notas');
                res.status(200).json(notas)
            }
        }
    } catch (error){
        console.error(error);
        res.status(500).send('Hubo un error en el servidor');
    }
})

router.get('/notas/:id', async (req,res)=>{
	let id = req.params.id
    try{
        let notas = await datos(`SELECT * FROM notas WHERE id=${id}`)
        notas[0].profesor = await datos(`SELECT * FROM profesores WHERE id=${notas[0].profesor}`)
        notas[0].alumno = await datos(`SELECT * FROM alumnos WHERE id=${notas[0].alumno}`)
        notas[0].cuatrimestre = await datos(`SELECT * FROM cuatrimestres WHERE id_cuatrimestre=${notas[0].cuatrimestre}`)
        notas[0].materia = await datos(`SELECT * FROM materias WHERE id=${notas[0].materia}`)
        notas[0].curso = await datos(`SELECT * FROM cursos WHERE id=${notas[0].curso}`)
        console.log('Se consultó por la nota: ',notas);
        if (notas.length === 0 || notas === 'error'){ 
            return  res.status(404).send('Hubo un error, o el recurso no existe')
        } else{
            res.status(200).json(notas.find( p => p.id === + id)) //Busca donde combina el parametro id, con el id de los objetos en notas
        }
    } catch (error){
        console.error(error);
        res.status(500).send('Hubo un error en el servidor');
    }
})

 router.post('/notas', (req, res) => {
    try{
        let {id, año, nota, profesor, alumno, cuatrimestre, materia, curso} = req.body;
        // Cuando en la DB la primary key es de tipo serial, siempre hay que insertarla con el valor cero "0"
        // no funciona mando el 'default'
        let consulta = `INSERT INTO notas VALUES ('0', '${año}','${nota}', ${profesor.id}, '${alumno.id}',${cuatrimestre.id_cuatrimestre}, ${materia.id}, ${curso.id})`;
        db_local.query(consulta, (error, results) =>{
            if (error) {throw error}
            else {
                console.log(results);
                console.log('Inserción correcta');
                res.status(204).send('Inserción correcta')
            }
        })
    } catch (error){
        console.log(error);
        res.status(500).send('Hubo un error en el servidor')
    }
});


router.put('/notas', async (req, res) =>{
    try {
        let {id, año, nota, profesor, alumno, cuatrimestre, materia, curso} = req.body;
        let consulta = `UPDATE notas SET año='${año}',nota='${nota}', profesor=${profesor.id}, alumno='${alumno.id}', cuatrimestre=${cuatrimestre.id_cuatrimestre}, materia=${materia.id}, curso=${curso.id} WHERE id=${id}`;
        db_local.query(consulta, (error, results) =>{
            if (error) {throw error}
            else {
                console.log(results);
                console.log('Actualizacion correcta');
                res.status(204).send('Actualizacion correcta')
            }
        })
    } catch (error) {
        res.status(400).send('No se pudo actualizar')
    }
})

// El proyecto no exigía método delete, solo lo hice para aprender
// router.delete('/notas/:id', (req,res)=>{
//     let id = req.params.id;
// 	// res.send(`Has eliminado correctamente a ${id}`)
//     res.send('Este endpoint no posee un metodo delete')
// })



module.exports = router;