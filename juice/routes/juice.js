var express = require('express');
var router = express.Router();
const Juice = require('../models/juiceModel');

/* GET Juice listing. */
router.get('/', async function(req, res, next) {
    const items = await Juice.find();
    res.status(200);
    res.json({
        message: 'Juice List',
        result: items
    })
});

router.post('/', async function(req, res){
    const newItem = {id: Date.now(), ...req.body};

    const juice = new Juice(newItem);

    try {
        await juice.save();
        res.status(201).json({
            message: 'Created juice successfully',
            result: juice
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to created juice',
            result: []
        })
    }
})

router.get('/:id', async function(req, res){
    const itemId = parseInt (req.params.id);
    // const item= juices.find(i => i.id === parseInt(req.params.id));
    const item = await Juice.findOne({
        brand_code: itemId
    })
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
})

router.delete('/:id', async function(req, res){
    const itemId = parseInt(req.params.id);

    try {
        await Juice.deleteOne({
            brand_code: itemId
        });
        res.status(201);
        res.json({
            message : 'Successfully Deleted'
        })
    } catch (error) {
        res.status(404);
        res.json({
            message: 'Juice not exist'
        })
    }
})

router.put('/:id', async function(req, res){
    //const item = juices.find(i=> i.id === parseInt(req.params.id));
    const itemId = parseInt(req.params.id);

    try {
        const item_brand = req.body.brand || item.brand;
        const item_description = req.body.description || item.description;

        await Juice.findOneAndUpdate(
            {
                brand_code: itemId
            },
            {
                $set: {
                    brand: item_brand,
                    description: item_description
                }
            }
        )

        const updatedJuice = await Juice.findOne({
            brand_code: itemId
        });
         
        res.status(201);
        res.json(({
            message : "Successfully Updated Juice!",
            result: updatedJuice
        }));

    } catch (error) {
        res.status(404);
        res.json({
            message: 'Juice not exist'

        })
    }
})
module.exports = router;
