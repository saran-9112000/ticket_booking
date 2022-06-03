const { params } = require('@hapi/hapi/lib/validation');
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
            console.log(decoded.Role)
            const movie = await Movie.query().findOne({movieId:params.id})
            console.log("movie", movie)
            const available = JSON.parse(movie.availableSeats)
            console.log("before for loop",available)
        for(let i=0,length = available.length;i<length;i++) {
            console.log("available",available[i])
            if(available[i] == ' ') return "Users booked seats in this movie"
             await Movie.query().findOne({movieId:params.id}).delete();
        }
        return 'You dont have access to do the operation' 
        }
                
        }
        catch (err){
            return err
        }
} 

exports.validateTicket = async(payload) => {
const compare = await Movie.query().findOne({movieId:payload.movieId})
console.log("COMPARE",compare.availableSeats)
const seats = payload.seatsBooked
const tickets = JSON.parse(compare.availableSeats)
var count =0
for(let i=0,length = seats.length;i<length;i++){
            for (let j=0,length = tickets.length;j<length;j++){
                 if(seats[i] == tickets[j]) {
                     console.log('tickets',tickets[j])
                    console.log("Seats",seats[i])
                    const splicing = tickets.splice(seats[i]-1, 1, " ")
                    console.log("splicing value ",j-1)
                    console.log('tickets',tickets)
                    console.log("SPLICING",splicing)
                    const newTable = await Movie.query().findOne({movieId:payload.movieId}).patch({
                        availableSeats:JSON.stringify(tickets)
                    })
                    count=count+1
                }
            }
        }
        if (seats.length==count) return true
        return false
        
}

exports.updateTicket = async(user) => {
const compare = await Movie.query().findOne({movieId:user.movieId})
console.log("COMPARE",compare.availableSeats)
const seats = JSON.parse(user.seatsBooked)
const tickets = JSON.parse(compare.availableSeats)
let count = 0
for(let i=0,length = seats.length;i<length;i++){
            console.log("SEATS",seats[i])
             const splicing = tickets.splice(seats[i]-1,1,seats[i])
             console.log("splicing",splicing)
            count=count+1
        }
        const newTable = await Movie.query().findOne({movieId:user.movieId}).patch({
            availableSeats:JSON.stringify(tickets)
        })
    if(seats.length == count) return true
    return false
}

