const express = require('express');
const router = express.Router()
const profesores = require('../fake/profesores');
const { db_local, db_real } = require('../db');


router.get('/profesores', (req, res) => {
	const page = +req.query.page;
	const pageSize = +req.query.pageSize;

	if (page && pageSize) {
			const start = (page - 1) * pageSize;
			const end = start + pageSize;
			res.json(profesores.slice(start, end));
		} else {
				res.json(profesores);
		}
	
	// db_local.connect(error => {
	// 	if (error) { throw error }
	// 	else {
	// 		console.log('Conección establacida con la base de datos');
	// 		db_local.query('SELECT * FROM profesores', (error, results)=>{
	// 			if (error) { throw error }
	// 			else {
	// 				console.log(results);
	// 				res.json(results);
	// 			}
	// 		})
	// 	}
	// 	db_local.end(console.log('Conexión con la base de datos terminada'))
	// })
})

router.get('/profesores/:id', (req,res)=>{
	let id = req.params.id
    res.json(profesores.find( p => p.id === + id)) //Busca donde combina el parametro id, con el id de los objetos en profesores
})



module.exports = router;