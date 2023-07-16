// @author : Juan Basgall

const express = require('express');
const router = express.Router()
const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY
const { validarToken } = require('../modules/validarToken')
const { db_local, db_real, datos } = require('../db');

router.post('/login', async (req, res)=>{
    const {nombre_usuario, contrasenia} = req.body;
    try{
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

                const token = jwt.sign({ usuario : usuario[0] }, secretKey, { expiresIn: '30d'}, (err, token)=>{
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({
                            token
                        });
                    }
                });

                break;
            default:
                console.error("Rol no identificado")
        }
        // res.json(usuario)
    } catch(e){
        res.status(404).send("Hubo un problema, posiblemente la DDBB está desconectada.")
    }
})


// // Endpoint de pruebas de validación por JWT
// router.get('/login', validarToken, (req, res)=>{
//     //Verificamos que el token sea valido:
//     // const token = req.headers.authorization.split(" ")[1] // Esto es si no hago uso d la función "validarToken"
//     jwt.verify(req.token, secretKey, (err, authData)=>{
//         if (err){
//             res.sendStatus(403)
//         } else {
//             res.json({
//                 mensaje: "Acción ejecutada correctamente",
//                 authData
//             })
//         }
//     })
// })




module.exports = router;