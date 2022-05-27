const movieService = require('../services/movie.service');
const tokenAccess = require('../validator/jwt/token.validator.js')


exports.createMovie = async(req,res,next) => {
    console.log(req.payload)
    const token = tokenAccess.check(req.headers["x-access-token"]) 
    console.log(token)
    const user = await movieService.createMovie(req.payload,token)
    console.log(user)
    return res.response(user).code(200)
}

exports.updateMovie = async(req,res,next) => {
    console.log(req.payload)
    const token = tokenAccess.check(req.headers["x-access-token"]) 
    console.log(token)
    const user = await movieService.updateScreen(req.params, req.payload,token )
    console.log(user)
    return res.response(user).code(200)  
} 

exports.deleteMovie = async(req,res,next) => {
    console.log(req.payload)
    const token = tokenAccess.check(req.headers["x-access-token"]) 
    console.log(token)
    const user = await movieService.deleteMovie(req.params,token)
    console.log(user)
    return res.response(user).code(200)  
}