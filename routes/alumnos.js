const express = require('express');
const router = express.Router()



router.get('/alumnos', (req, res) => {
    res.send('Modulo activado pero sin contenido')
})

 


module.exports = router;