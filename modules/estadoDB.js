async function estadoDB(res, db){
    try{
        const resultado = new Promise((resolve, reject)=>{
            db.query('SELECT true AS "estado"', (error, result)=>{
                if (error){
                    console.log("No se pudo conectar con la base de datos")
                    res.status(503).send("Base de datos desconectada")
                    reject(error)
                } else {
                    console.log("Base de datos conectada.")
                    resolve(result)
                }
            })
        })
    } catch (e){
        console.log("Hubo un error al chequear el estado de la DB")
        return false;
    }
    
}

module.exports = {estadoDB}