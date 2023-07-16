const express = require('express');
const router = express.Router()


router.get('/endpoints', (req, res) => {
    res.render('views/endpoints')
});


module.exports = router;