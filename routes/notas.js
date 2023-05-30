// @author : Juan Angel Basgall - https://www.linkedin.com/in/juanangelbasgall/

const express = require('express');
const router = express.Router()
const notas = require('../fake/notas')
const { db_local, db_real, datos } = require('../db');

router.get('/notas', async (req, res) => {
	const page = +req.query.page; //tomo las variables despies del ? de la url
	const pageSize = +req.query.pageSize;
	let notas = await datos('SELECT * FROM notas')
	if (notas === 'error'){ 
		return  res.status(404).send('Hubo un error')
	} else{

		if (page && pageSize) {
			const start = (page - 1) * pageSize;
			const end = start + pageSize;
			console.log('Ejecutado método get paginado de notas');
			res.json(notas.slice(start, end));
		} else {
			console.log('Ejecutado método get de notas');
			res.json(notas)
		}
	}
})

router.get('/notas/:id', async (req,res)=>{
	let id = req.params.id
	let notas = await datos(`SELECT * FROM notas WHERE id=${id}`)
	console.log('Se consultó por la nota: ',notas);
	if (notas.length === 0 || notas === 'error'){ 
		return  res.status(404).send('Hubo un error, o el recurso no existe')
	} else{
    	res.json(notas.find( p => p.id === + id)) //Busca donde combina el parametro id, con el id de los objetos en notas
	}
})

 router.post('/notas', (req, res) => {
    // const nuevaNota = req.body; // Obtener los datos enviados por el cliente en la solicitud POST
    // console.log(nuevaNota);
    // res.send(`Sacaste un: ${nuevaNota.valor} en ${nuevaNota.materia} con ${nuevaNota.profesor}`); // Enviar una respuesta al cliente
    

    // db_local.connect( error=>{ 
    //     if (error) {throw error}
    // })
    
    let {valor, materia, alumno, profesor} = req.body;
    let consulta = `INSERT INTO notas VALUES ('default', '${valor}','${materia}','${alumno}','${profesor}')`;
    
    db_local.query(consulta, (error, results) =>{
        if (error) {throw error}
        else {
            console.log(results);
            console.log('Inserción correcta');
            res.send('Inserción correcta')
        }
    })
    // db_local.end()
});

/* Solo falta metodo put, y luego aprender el manejo de la db */

router.put('/notas/:id', async (req, res) =>{
    try {
        let id= req.params.id;
        let {valor, materia, profesor} = req.body;
        res.send(`Actualizaste un: ${valor} en ${materia} con ${profesor}`); // Enviar una respuesta al cliente
        // let response = await db.User.update({}) se me corto la luz, despues sigo
        // https://www.youtube.com/watch?v=77qB3a3P8Ag
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