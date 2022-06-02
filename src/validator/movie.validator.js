const Joi = require('@hapi/joi')
const movieSchema = Joi.object({
    screenId: Joi.number().min(1).required(),
    movieName:  Joi.string().min(5).max(35).required(),
    movieTiming: Joi.date().required(),
    availableSeats: Joi.allow().required()
})


module.exports={
    movieSchema
}