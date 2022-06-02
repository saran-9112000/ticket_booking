const Joi = require('@hapi/joi')
const ticketSchema = Joi.object({
    movieId: Joi.number().min(1).required(),
    numberOfSeats: Joi.number().min(1).required(),
    seatsBooked: Joi.allow().required(),
})


module.exports={
    ticketSchema
}