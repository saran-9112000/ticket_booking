const Joi = require('@hapi/joi')
const screenSchema = Joi.object({
    screenNumber: Joi.number().min(1).required(),
    screenName:  Joi.string().min(5).max(30).required(),
    seatingCapacity: Joi.number().min(100).max(1000).required(),
})

module.exports={
    screenSchema
}