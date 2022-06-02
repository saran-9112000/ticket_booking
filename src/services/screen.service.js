const Screen = require('../models/screen.model')
const { screenSchema } = require('../validator/screen.validator');

exports.createScreen = async(payload, decoded) => {
    try{
    if(decoded.Role == 'Super Admin') {
        const result = await screenSchema.validateAsync(payload)
        console.log(result)
        console.log("checking service payload details",payload)
        const user = await Screen.query().insert({
            screenNumber: payload.screenNumber,
            screenName: payload.screenName,
            seatingCapacity: payload.seatingCapacity
    });
    return user
    }
    return 'You dont have access to do the operation'     
    }
    catch (err){
        return err
    }   
}

exports.updateScreen = async(params, payload, decoded) => {
    try{
        if(decoded.Role == 'Super Admin') {
            const user = await Screen.query().findOne({screenId:params.id}).patch({
                screenNumber: payload.screenNumber,
                screenName: payload.screenName,
                seatingCapacity: payload.seatingCapacity
              })
              return user
        }
        return 'You dont have access to do the operation'     
        }
        catch (err){
            return err
        }
   
} 

exports.deleteScreen = async(params,decoded) => {
    try{
        if(decoded.Role == 'Super Admin') {
            return await Screen.query().findOne({screenId:params.id}).delete();
        }
        return 'You dont have access to do the operation'     
        }
        catch (err){
            return err
        }
    
} 