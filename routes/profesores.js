// @author : Juan Angel Basgall - https://www.linkedin.com/in/juanangelbasgall/

const express = require('express');
const router = express.Router()
// const profesores = require('../fake/profesores');
const { db_local, db_real, datos} = require('../db');

router.get('/profesores', async (req, res) => {
	const page = +req.query.page; //tomo las variables despies del ? de la url
	const pageSize = +req.query.pageSize;
	let profesores = await datos('SELECT * FROM profesores')
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
})

router.get('/profesores/:id_profesor', async (req,res)=>{
	let id_profesor = req.params.id_profesor
	let profesores = await datos(`SELECT * FROM profesores WHERE id_profesor=${id_profesor}`)
	console.log('Se consultó por la nota: ',profesores);
	if (profesores.length === 0 || profesores === 'error'){ 
		return  res.status(404).send('Hubo un error, o el recurso no existe')
	} else{
    	res.json(profesores.find( p => p.id_profesor === + id_profesor)) //Busca donde combina el parametro id_profesor, con el id_profesor de los objetos en profesores
	}
})



module.exports = router;
// module.exports = getStandard;