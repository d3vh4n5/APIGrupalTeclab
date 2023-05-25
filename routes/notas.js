const express = require('express');
const router = express.Router()

const notas = require('../fake/notas')

router.get('/notas', (req, res) => {
    console.log('Hubo una solicitud de tipo GET en /notas');
    res.json(notas);
 })

 /* meotdo get pero con parámetros */

 router.post('/notas', (req, res) => {
    const nuevaNota = req.body; // Obtener los datos enviados por el cliente en la solicitud POST
    console.log(nuevaNota);
    res.send(`Sacaste un: ${nuevaNota.valor} en ${nuevaNota.materia} con ${nuevaNota.profesor}`); // Enviar una respuesta al cliente
});

 


module.exports = router;