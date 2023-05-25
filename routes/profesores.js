const express = require('express');
const router = express.Router()
const profesores = require('../fake/profesores');


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
    
 })

 router.get('/profesores/:id', (req,res)=>{
    let id = req.params.id
    res.json(profesores.find( p => p.id === + id)) //Busca donde combina el parametro id, con el id de los objetos en profesores
 })

 


module.exports = router;