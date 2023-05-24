const express = require('express');
const router = express.Router()





router.get('/endpoints', (req, res) => {
    res.render('endpoints/endpoints')
});




module.exports = router;