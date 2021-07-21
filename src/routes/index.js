const express = require('express');

const router = express.Router();

//criar render da view
router.get('/', async (req, res) =>{
    res.render('pages/index');
});

module.exports = router;