var express = require('express');
var router = express.Router();

router.get('/', async function(req, res) {
    res.status(200).json({msg: 'This is Cors-enabled for all origins!'});
});

module.exports = router;