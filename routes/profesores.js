const express = require('express');
const router = express.Router()
const profes = ['juansito', 'pepito', 'teresa'];
const profesores = require('../api/profesores');


router.get('/profesores', (req, res) => {
    res.json(profesores);
 })

router.get('/profesores', (req, res) => {
    res.send(profes)
})

 


module.exports = router;