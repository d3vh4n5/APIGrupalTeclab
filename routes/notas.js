const express = require('express');
const router = express.Router()
const notas = require('../fake/notas')
const { db_local, db_real } = require('../db');

router.get('/notas', (req, res) => {
    console.log('Hubo una solicitud de tipo GET en /notas');
    res.json(notas);
 })

 /* meotdo get pero con parámetros  y get query*/

 router.post('/notas', (req, res) => {
    const nuevaNota = req.body; // Obtener los datos enviados por el cliente en la solicitud POST
    console.log(nuevaNota);
    res.send(`Sacaste un: ${nuevaNota.valor} en ${nuevaNota.materia} con ${nuevaNota.profesor}`); // Enviar una respuesta al cliente

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

router.delete('/notas/:id', (req,res)=>{
	let id = req.params.id;
	res.send(`Has eliminado correctamente a ${id}`)
})
 


module.exports = router;