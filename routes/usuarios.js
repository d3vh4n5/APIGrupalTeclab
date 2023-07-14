// @author : Juan Basgall

const express = require('express');
const router = express.Router()
const { db_local, db_real, datos } = require('../db');

router.get('/usuarios', async (req,res)=>{
    let usuarios = await datos("SELECT * FROM usuarios")
    const roles = await datos("SELECT * FROM roles")
    const profesores = await datos("SELECT * FROM profesores")
    const secretarias = await datos("SELECT * FROM secretarias")
    const administradores = await datos("SELECT * FROM administradores")
    const materias = await datos("SELECT * FROM materias")

    usuarios.forEach(usuario => {
        usuario.rol = roles.find(r => r.id == usuario.rol);
        switch (usuario.rol.nombre.toLowerCase()){
            case "profesor":
                usuario.persona = profesores.find(p=> p.usuario_relacionado == usuario.id)
                usuario.persona.materia = materias.find(m => m.id == usuario.persona.materia)
                break;
            case "administrador":
                usuario.persona = administradores.find(p=> p.usuario_relacionado == usuario.id)
                break;
            case "secretaria":
                usuario.persona = secretarias.find(p=> p.usuario_relacionado == usuario.id)
                break;
            default:
                usuario.persona = "Not related"
        }
    });
    res.json(usuarios)
})
// router.post()
// router.put()
// router.delete()




module.exports = router;