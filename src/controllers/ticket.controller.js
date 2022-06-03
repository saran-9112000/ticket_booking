const ticketService = require('../services/ticket.service');
const tokenAccess = require('../validator/jwt/token.validator')
exports.bookTicket = async(req,res,next) => {
    console.log(req.payload)
    const token = await tokenAccess.check(req.headers["x-access-token"]) 
    console.log("after validating token",token)
    const user = await ticketService.bookTicket(req.payload,token)
    console.log(user)
    return res.response(user).code(200)
}

exports.deleteTicket = async(req,res,next) => {
    console.log(req.payload)
    const token = await tokenAccess.check(req.headers["x-access-token"]) 
    console.log(token)
    const user = await ticketService.deleteTicket(req.params,token)
    console.log(user)
    return res.response(user).code(200)  
}