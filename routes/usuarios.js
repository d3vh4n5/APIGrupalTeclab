// @author : Rosario Osti

const express = require('express');
const router = express.Router()
const { db_local, db_real, datos } = require('../db');


// Los métodos a crear:
router.get()
router.get() // Este es el get pero con parámetro (id), para una búsqueda específica
router.post()
router.put()
router.delete()

/*
    Para correr el programa usá el comando "npm run dev" esto ya te lo corre con nodemon

    Si querés para empezar, hacete algo facil con un array que contenga objetos fake
    para que aprendas a usar los métodos, y después implementá la base de datos.

    Cuando vayas a implementar la base de datos vas a tener que crear un archivo
    .env a nivel raíz, pero consultame si necesitas!
*/










module.exports = router; // Esto dejalo al final y no lo borres =)