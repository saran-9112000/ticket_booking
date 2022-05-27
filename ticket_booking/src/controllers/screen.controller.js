const screenService = require('../services/screen.service');
const tokenAccess = require('../validator/jwt/token.validator.js')


exports.createScreen = async(req,res,next) => {
    console.log(req.payload)
    const token = tokenAccess.check(req.headers["x-access-token"]) 
    console.log(token)
    const user = await screenService.createScreen(req.payload,token)
    console.log(user)
    return res.response(user).code(200)
}

exports.updateScreen = async(req,res,next) => {
    console.log(req.payload)
    const token = tokenAccess.check(req.headers["x-access-token"]) 
    console.log(token)
    const user = await screenService.updateScreen(req.params, req.payload,token )
    console.log(user)
    return res.response(user).code(200)  
} 

exports.deleteScreen = async(req,res,next) => {
    console.log(req.payload)
    const token = tokenAccess.check(req.headers["x-access-token"]) 
    console.log(token)
    const user = await screenService.deleteScreen(req.params,token)
    console.log(user)
    return res.response(user).code(200)  
}