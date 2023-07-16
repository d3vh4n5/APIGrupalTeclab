// @author : Juan Basgall

const express = require('express');
const router = express.Router()
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET
const { db_local, db_real, datos } = require('../db');

router.post('/login', async (req, res)=>{
    const {nombre_usuario, contrasenia} = req.body;

    const usuario = await datos(`
    SELECT usuarios.nombre_usuario, usuarios.id, roles.nombre AS rol
    FROM usuarios
    INNER JOIN roles ON usuarios.rol = roles.id
    WHERE usuarios.nombre_usuario = "${nombre_usuario}" AND usuarios.contrasenia = "${contrasenia}"
    `)
    switch(usuario[0].rol.toLowerCase()){
        case "profesor":
            const persona = await datos(`SELECT nombre FROM profesores WHERE usuario_relacionado = ${usuario[0].id}`)
            usuario[0].persona = persona[0].nombre
            // const token = jwt.sign({
            //     usuario[0],
            //     exp: Date.now() + 60 * 1000
            // })
            break;
        default:
            console.error("Rol no identificado")
    }
    res.json(usuario)
})





module.exports = router;