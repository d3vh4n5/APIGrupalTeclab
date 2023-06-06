// @author : Juan Angel Basgall - https://www.linkedin.com/in/juanangelbasgall/

const express = require('express');
const router = express.Router()
const { db_local, db_real, datos} = require('../db');

router.get('/profesores', async (req, res) => {
	const page = +req.query.page; //tomo las variables despies del ? de la url
	const pageSize = +req.query.pageSize;
	try{

		let profesores = await datos('SELECT * FROM profesores')
		let materias = await datos('SELECT * FROM materias')
		
		for (let profe of profesores){
			mat = materias.find( m => m.id_materia == profe.materia);
			profe.materia = mat;
		}
		
		if (profesores === 'error'){ 
			return  res.status(404).send('Hubo un error')
		} else{
			
			if (page && pageSize) {
				const start = (page - 1) * pageSize;
				const end = start + pageSize;
				console.log('Ejecutado método get paginado de profesores');
				res.json(profesores.slice(start, end));
			} else {
				console.log('Ejecutado método get de profesores');
				res.json(profesores)
			}
		}
	} catch (error){
		console.error(error);
        res.status(500).send('Hubo un error en el servidor');
	}
})

router.get('/profesores/:id_profesor', async (req,res)=>{
	let id_profesor = req.params.id_profesor
	try{
		let profesores = await datos(`SELECT * FROM profesores WHERE id_profesor=${id_profesor}`)
		let mat = await datos(`SELECT * FROM materias WHERE id_materia=${profesores[0].materia}`)
		profesores[0].materia = mat[0]
		console.log('Se consultó por el profesor: ',profesores);
		if (profesores.length === 0 || profesores === 'error'){ 
			return  res.status(404).send('Hubo un error, o el recurso no existe')
		} else{
			res.json(profesores.find( p => p.id_profesor === + id_profesor)) //Busca donde combina el parametro id_profesor, con el id_profesor de los objetos en profesores
		}
	} catch (error){
		console.error(error);
        res.status(500).send('Hubo un error en el servidor');
	}
})



module.exports = router;