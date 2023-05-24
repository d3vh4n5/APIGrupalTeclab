const express = require('express');
const router = express.Router()


// Ejemplo de solicitud de tipo get
router.get("/productos", (req,res) => {
   const productos = [
        {
   id: 1,
   name: "Martillo",
        },
        {
   id: 2,
   name: "Destornillador",
        },
        ,
        {
   id: 3,
   name: "Pinza",
        },
      ];
   res.json(productos);
   })

router.get('/productos/:id', (req,res,)=>{
    res.send('Producto: '+req.params.id)
})


router.get('/profesores', (req, res) => {
   res.json(profesores);
})


module.exports = router;