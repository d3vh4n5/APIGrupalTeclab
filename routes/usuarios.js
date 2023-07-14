// @author : Juan Basgall

const express = require('express');
const router = express.Router()
const { db_local, db_real, datos } = require('../db');

router.get('/usuarios', async (req,res)=>{
    try{

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
    } catch (e){
        console.error("Hubo un error: ", e)
        res.status(404).send("Hubo un error inesperado, posiblemnte en la base de datos")
    }
})
router.post('/usuarios', async (req, res)=>{
    const {nombre_usuario, contrasenia, rol, persona} = req.body
    try{
        let exists = await datos(`SELECT * FROM usuarios WHERE nombre_usuario="${nombre_usuario}"`)
        // console.log(exists)
        if (exists.length > 0) {
            console.error("Nombre de usuario no disponible")
            res.status(404).send("Nombre de usuario no disponible")
        } else {
            let dbRes = await datos(`INSERT INTO usuarios VALUES (default, '${nombre_usuario}', '${contrasenia}', ${rol})`);
            if (dbRes === 'error'){
                console.error("Hubo un error al inserter el usuario", dbRes)
                res.status(404).send("Hubo un error al inserter el usuario")
            } else{
                // console.log("Usuario insertado correctamente.")
                // console.log("Obteniendo información...")
                let usuario = await datos(`SELECT * FROM usuarios WHERE usuarios.nombre_usuario="${nombre_usuario}"`)
                console.log(usuario)
                if (usuario === 'error'){
                    console.error("Hubo un error al inserter el usuario", usuario)
                    res.status(404).send("Hubo un error al inserter el usuario")
                } else{
                    // console.log("usuario id:", usuario[0].id)
                    let rol = await datos(`SELECT * FROM roles WHERE id="${usuario[0].rol}"`)
                    usuario[0].rol = rol[0]
                    // console.log("Rol del usuario:", usuario[0].rol);
                    // console.log("user: ",usuario)
                    switch (usuario[0].rol.nombre.toLowerCase()){
                        case "profesor":
                            // console.log("Todo ok")
                            // console.log(persona.id)
                            // console.log(usuario[0].rol)
                            let update = await datos(`UPDATE profesores SET usuario_relacionado = ${usuario[0].id} WHERE id = ${persona.id}`)
                            let datosPersona = await datos(`SELECT * FROM profesores WHERE id = ${persona.id}`)
                            if (update != 'error'){
                                usuario[0].persona = datosPersona[0]
                                console.log("Se insertó correctamente: ", usuario)
                                res.status(200).json(usuario)
                            }
                            break;
                        case "secretaria":
                            // Falta código
                            break;
                        case "administrador":
                            // Falta código
                            break;
                        default:
                            console.error("No se identificó el rol")
                            response.status(404).send("No se pudo identificar el rol")
                    }


                    // res.status(200).send("El usuario se insertó correctamente.")
                }
            }
        }
    } catch (e){
        console.error("Ocurrió un error inesperado.", e)
        res.status(404).send("Ocurrió un error inesperado.")
    }
})
// router.put()
// router.delete()




module.exports = router;