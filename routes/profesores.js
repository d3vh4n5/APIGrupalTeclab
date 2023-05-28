// @author : Juan Angel Basgall - https://www.linkedin.com/in/juanangelbasgall/

const express = require('express');
const router = express.Router()
// const profesores = require('../fake/profesores');
const { db_local, db_real, datos} = require('../db');

const getStandard = (endpoint, finder = null, fAttr = null) =>{

	router.get(`/${endpoint}`, async (req, res) => {
		const page = +req.query.page; //tomo las variables despies del ? de la url
		const pageSize = +req.query.pageSize;
		let data = await datos(`SELECT * FROM ${endpoint}`)
		if (data === 'error'){ 
			return  res.status(404).send('Hubo un error')
		} else{
	
			if (page && pageSize) {
				const start = (page - 1) * pageSize;
				const end = start + pageSize;
				console.log(`Ejecutado método get paginado de ${endpoint}`);
				res.json(data.slice(start, end));
			} else {
				console.log(`Ejecutado método get de ${endpoint}`);
				res.json(data)
			}
		}
	})
	
	router.get(`/${endpoint}${finder}`, async (req,res)=>{
		let find = req.params.finder
		let data = await datos(`SELECT * FROM ${endpoint} WHERE ${fAttr}=${find}`)
		console.log('Se consultó por : ',data);
		if (data.length === 0 || data === 'error'){ 
			return  res.status(404).send('Hubo un error, o el recurso no existe')
		} else{
			// res.json(profesores.find( p => p.id === + find)) //Busca donde combina el parametro id, con el id de los objetos en profesores
			res.json(data)
		}
	})
}

getStandard('profesores', '/:finder', 'dni')



module.exports = router;
// module.exports = getStandard;