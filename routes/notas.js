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
    res.json(notas);
 })

 

// router.get('/notas', (req, res) => {
//     res.send('Modulo activado pero sin contenido')
// })

 


module.exports = router;