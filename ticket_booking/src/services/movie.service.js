const Movie = require('../models/movie.model')
const { modelSchema } = require('../validator/model.validator');


exports.createMovie = async(payload, decoded) => {
    try{
    if(decoded == 'Super Admin') {
        const result = await modelSchema.validateAsync(payload)
        console.log(result)
        console.log("checking service payload details",payload)
        const user = await Movie.query().insert({
            screenId: payload.screenId,
            movieName: payload.movieName,
            movieTiming: payload.movieTiming,
            availableSeats: payload.availableSeats
    });
    return user
    }
    return 'You dont have access to do the operation'     
    }
    catch (err){
        return err
    }   
}

exports.updateMovie = async(params, payload, decoded) => {
    try{
        if(decoded == 'Super Admin') {
            const user = await Movie.query().findOne({movieId:params}).patch({
                screenId: payload.screenId,
                movieName: payload.movieName,
                movieTiming: payload.movieTiming,
                availableSeats: payload.availableSeats
              })
              return user
        }
        return 'You dont have access to do the operation'     
        }
        catch (err){
            return err
        }
   
} 

exports.deleteMovie = async(params,decoded) => {
    try{
        if(decoded == 'Super Admin') {
            return await Movie.query().findOne({movieId:params}).delete();
        }
        return 'You dont have access to do the operation'     
        }
        catch (err){
            return err
        }
} 