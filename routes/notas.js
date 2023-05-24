const express = require('express');
const router = express.Router()


// router.get('/profesores', (req, res) => {
//     res.json(profesores);
//  })

router.get('/notas', (req, res) => {
    res.send('Modulo activado pero sin contenido')
})

 


module.exports = router;