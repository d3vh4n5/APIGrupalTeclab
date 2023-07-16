
//Esta función en realidad, valida la presencia de la variable token, y si está
//La lleva del header al body.

// Authorization: Bearer <token>
function validarToken(req, res, next){
   const bearerHeader = req.headers['authorization'];

   if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
   } else{
        res.sendStatus(403)
   }
}

module.exports = {
    validarToken
}