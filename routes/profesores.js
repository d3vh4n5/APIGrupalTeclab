const express = require('express');
const router = express.Router()
// const profesores = require('../fake/profesores');
const { db_local, db_real } = require('../db');

const datos = async () => {
	return new Promise((resolve, reject) => {
		db_local.query('SELECT * FROM profesores', (error, results) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
};

router.get('/profesores', async (req, res) => {
	const page = +req.query.page; //tomo las variables despies del ? de la url
	const pageSize = +req.query.pageSize;
	let profesores = await datos()
	
	if (page && pageSize) {
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		console.log('Ejecutado método get paginado de profesores');
		res.json(profesores.slice(start, end));
	} else {
		//Esta solo la queri porque los metodos conect y end me la hacían crashear
		console.log('Ejecutado método get de profesores');
		res.json(profesores)
	}
})

router.get('/profesores/:dni', async (req,res)=>{
	let dni = req.params.dni
	let profesores = await datos()
    res.json(profesores.find( p => p.dni === + dni)) //Busca donde combina el parametro id, con el id de los objetos en profesores
})



module.exports = router;