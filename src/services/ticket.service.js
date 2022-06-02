const Ticket = require('../models/ticket.model')
const Movie= require('../models/movie.model')
const { ticketSchema } = require('../validator/ticket.validator');

exports.bookTicket = async(payload, decoded) => {
    try{
    if(decoded.Role == 'Super Admin' ||"Admin" || "User") {
        const result = await ticketSchema.validateAsync(payload)
        console.log(result)
        const compare = await Movie.query().findOne({movieId:payload.movieId})
        console.log("COMPARE",compare.availableSeats)
       
            
            console.log("checking service payload details",payload)
            const user = await Ticket.query().insert({
                movieId: payload.movieId,
                userId: decoded.userId,
                numberOfSeats: payload.numberOfSeats,
                seatsBooked: JSON.stringify(payload.seatsBooked),
                totalAmount: (120)*(payload.numberOfSeats)
        });
        return user
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
            if(user) return await Ticket.query().findOne({ticketId:params.id}).delete();
        return "you cannot do this operation"
        }
        return 'You dont have access to do the operation'     
        }
        catch (err){
            return err
        }
} 