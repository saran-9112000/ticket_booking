const Ticket = require('../models/ticket.model')
const movieService = require('../services/movie.service')
const { ticketSchema } = require('../validator/ticket.validator');


exports.bookTicket = async(payload, decoded) => {
    try{
    if(decoded.Role == 'Super Admin' ||"Admin" || "User") {
        const result = await ticketSchema.validateAsync(payload)
        console.log(result)
        const validate= await movieService.validateTicket(payload)   
            console.log("checking service validate details",validate)
            if(validate==true) {
                const user = await Ticket.query().insert({
                    movieId: payload.movieId, 
                    userId: decoded.userId,
                    numberOfSeats: payload.numberOfSeats,
                    seatsBooked: JSON.stringify(payload.seatsBooked),
                    totalAmount: (120)*(payload.numberOfSeats)
            });
            return user
            }
           return "ticket already booked" 
        }
       return "Cannot access this page"  
    }
    catch (err){
        return err
    }   
}

exports.deleteTicket = async(params,decoded) => {
    try{
        if(decoded.Role == 'Super Admin'||'User') {
            const user = await Ticket.query().findOne({userId:decoded.userId})
            if(user){
                const validate= await movieService.updateTicket(user) 
                if(validate == true){
                    const ticket = await Ticket.query().findOne({bookingId:params.id}).delete();
                    return "ticket deleted"
                }
            } 
        return "you cannot do this operation"
        }
        return 'You dont have access to do the operation'     
        }
        catch (err){
            return err
        }
} 