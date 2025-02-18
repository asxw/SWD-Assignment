var express = require('express');
var router = express.Router();

const juiceController = require('../controllers/juiceController');

router.get('/', juiceController.getJuiceList);

router.post('/', juiceController.createJuice);

router.get('/:id', juiceController.getJuiceDetail);

router.delete('/:id', juiceController.deleteJuice);

router.put('/:id', juiceController.updateJuice);

module.exports = router;