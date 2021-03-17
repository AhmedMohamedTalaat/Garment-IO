const Mongoose = require('mongoose');
const Joi=require('joi');
const batchSchema = new Mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
        min: 1,
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL'],
        required: true,
    },
    color: {
        type: String,
        enum: ['red', 'blue', 'black', 'green'],
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
});

function validation(batch){
    const schema=Joi.object({
        number:Joi.number().min(1).required(),
        size:Joi.string().uppercase().trim().valid('S', 'M', 'L', 'XL').required(),
        color:Joi.string().lowercase().trim().valid('red', 'blue', 'black', 'green').required(),
        quantity:Joi.number().min(1).required()
    });
    return schema.validate(batch);
}

function analyticsValidation(args){
    const schema=Joi.object({
        size:Joi.string().uppercase().trim().valid('S', 'M', 'L', 'XL').required(),
        color:Joi.string().lowercase().trim().valid('red', 'blue', 'black', 'green').required(),
    });
    return schema.validate(args);
}


const Batch = Mongoose.model('Batch', batchSchema);


exports.batchSchema = batchSchema;
exports.Batch = Batch;
exports.validation=validation;
exports.analyticsValidation=analyticsValidation;