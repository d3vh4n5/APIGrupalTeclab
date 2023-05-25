const express = require('express');
const router = express.Router()

const notas = [
    {
        id : 1,
        valor : 7.5,
        materia : "matematica",
        alumno: "Pepito",
        pofesor : "Elon Musk"
    },
    {
        id : 2,
        valor : 9,
        materia : "musica",
        alumno: "Andrea",
        pofesor : "Michael Jackson"
    },
]

router.get('/notas', (req, res) => {
    console.log('Hubo una solicitud de tipo GET en /notas');
    res.json(notas);
 })

 router.post('/notas', (req, res) => {
    const nuevaNota = req.body; // Obtener los datos enviados por el cliente en la solicitud POST
    console.log(nuevaNota);
    res.send(`Sacaste un: ${nuevaNota.valor} en ${nuevaNota.materia} con ${nuevaNota.profesor}`); // Enviar una respuesta al cliente
});

 


module.exports = router;