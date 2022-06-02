const Movie = require('../models/movie.model')
const Screen = require('../models/screen.model')
const { movieSchema } = require('../validator/movie.validator');

exports.getAllMovies = async(decoded) => {
    try{
        if(decoded.Role == 'user' || 'Admin' || 'Super Admin') {
        let user=await Movie.query();
        return user;
    }   
        return 'You dont have access to do the operation'     
        }
        catch (err){
            return err
        }
}

exports.createMovie = async(payload, decoded) => {
    try{
    if(decoded.Role == 'Super Admin') {
        const result = await movieSchema.validateAsync(payload)
        console.log(result)
        console.log("checking service payload details",payload)
        const validateScreen = await Screen.query().findOne({screenId:payload.screenId})
        if(validateScreen) {
            const validateTiming = await Movie.query().findOne({movieTiming:payload.movieTiming})
                if( !validateTiming){
                    const user = await Movie.query().insert({
                        screenId: payload.screenId,
                        movieName: payload.movieName,
                        movieTiming: payload.movieTiming,
                        availableSeats: JSON.stringify(payload.availableSeats)
                })
                return user
                }
        return "slot is full"
           
    }   
    return "screen does not exist"
    }
    return 'You dont have access to do the operation'     
    }
    catch (err){
        return err
    }   
}

exports.updateMovie = async(params, payload, decoded) => {
    try{
        console.log(params.id)
        if(decoded.Role == 'Super Admin') {
            const validateScreen = await Screen.query().findOne({screenId:payload.screenId})
            if(validateScreen){
                const validate = await Movie.query().where('screenId','=',params.id)
                const validateTiming = await Movie.query().findOne({movieTiming:payload.movieTiming})
                if(validate || !validateTiming){
                    const user = await Movie.query().findOne({movieId:params.id}).stringify().patch({
                        screenId: payload.screenId,
                        movieName: payload.movieName,
                        movieTiming: payload.movieTiming,
                        availableSeats: payload.availableSeats
                      })
                      return user
                }        
            return "time is booked"
            }
            return "screen does not exist"
        }
        return 'You dont have access to do the operation'     
        }
        catch (err){
            return err
        }
   
} 

exports.deleteMovie = async(params,decoded) => {
    try{
        if(decoded.Role == 'Super Admin') {
            return await Movie.query().findOne({movieId:params.movieId}).delete();
        }
        return 'You dont have access to do the operation'     
        }
        catch (err){
            return err
        }
} 

