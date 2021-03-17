const Mongoose = require('mongoose');
const {
    Batch,
    validation,
    analyticsValidation
} = require('../model/batch');
Mongoose.set('useCreateIndex', true);
const express = require('express');
const e = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const batches = await Batch.find().sort('quantity');
    return res.send(batches);
});


router.post('/', async (req, res) => {
    try {
        let {
            error
        } = validation(req.body);
        if (error) {
            return res.status(422).send({
                message: error.details
            });
        }
        const batch = new Batch({
            number: req.body.number,
            size: req.body.size.toUpperCase(),
            color: req.body.color.toLowerCase(),
            quantity: req.body.quantity
        });
        await batch.save();
        return res.send(batch);
    } catch (error) {
        return res.status(400).send({
            "error": error.toString()
        });
    }
});


router.get('/:color/:size', async (req, res) => {
    try {
        const {
            error
        } = analyticsValidation(req.params);
        if (error) {
            return res.status(422).send({
                message: error.details
            });
        }
        const quantity = await Batch.aggregate([{
            $match: {
                "color": req.params.color.toLowerCase(),
                "size": req.params.size.toUpperCase()
            }
        },{
            "$group":{
                "_id":null,
                "total":{"$sum":"$quantity"}
            }
        }]);
        
        if (quantity[0]['total']==0) {
            return res.send({
                "Total number:": "zero"
            });
        } else {
            return res.send({
                "Total number:": quantity[0]['total']
            });
        }
    } catch (error) {
        return res.status(400).send({
            "error": error.toString()
        });
    }

});
module.exports = router;