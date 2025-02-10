var express = require('express');
var router = express.Router();

/* GET Juice listing. */
var juices =[];
router.get('/', function(req, res, next) {
    res.status(200);
    res.json({
        message: 'Juice List',
        result: juices
    })
});

router.post('/', function(req, res){
    const newItem = {id: Date.now(), ...req.body};
    juices.push(newItem);
    res.status(200);
    res.json({
        message: 'Created juice successfully',
        result: newItem
    })
});

router.get('/:id', function(req, res){
    const item= juices.find(i => i.id === parseInt(req.params.id));
    
    if (!item){
        //To response not exist
        res.status(400)
        res.json({
            message: 'Juice not found!',
            result: []
        })
    }
    res.status(200)
    res.json({
        message: 'Juice Found!',
        result: item
    })
});

router.delete('/:id', async function(req, res){
    const index= juices.findIndex(i => i.id === parseInt(req.params.id));

    if (index === -1){
        res.status(400)
        res.json({
            message: 'Juice not exist!',
        })
    }
    juices.splice(index, 1);
    res.status(200)
    res.json({
        message: 'Sucessfully Delete!',
    })
});

router.put('/:id', async function(req, res){
    const item = juices.find(i=> i.id === parseInt(req.params.id));
    if (!item){
        res.status(400)
        res.json({
            message: 'Juice not exist!',
        })
    }
    item_brand = req.body.brand || item.brand;
    item_description = req.body.description || item.description;
    res.status(201);
    res.json({
        message: 'Sucessfully Updated Juice!',
        result: item
    });
});

module.exports = router;
