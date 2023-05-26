const express = require('express')
const router = express.Router()

router.get('/help-notas', (req, res) =>{
    res.render('endpoints/notas')
})
router.get('/help-profesores', (req, res) =>{
    res.render('endpoints/profesores')
})
router.get('/help-materias', (req, res) =>{
    res.render('endpoints/materias')
})
router.get('/help-alumnos', (req, res) =>{
    res.render('endpoints/alumnos')
})

module.exports = router