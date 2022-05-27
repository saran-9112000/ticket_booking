const Login = require("../models/login.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userSchema } = require('../validator/login.validator');


exports.signup = async(payload) => {
    console.log(payload)
    try{
        const result = await userSchema.validateAsync(payload)
        console.log(result)
        try{
            const validate = await Login.query().findOne({email:payload.email})
            if(!validate){
                const name = payload.userName
                const email = payload.email
                const role = payload.Role
                const hash_password = await bcrypt.hash(payload.userPassword, 10);
                console.log(hash_password)
                const user = await Login.query().insert({userName:name,email:email,Role:role,userPassword:hash_password});
                console.log(user)
                return user
            }
            else return "User Already in use"
            }
            catch (err) {
                console.log(err)
               throw err  
            }  
        }
        catch (err) {
            console.log(err)
            
           return err,"validation error"
        }
}

exports.login = async(payload) => {
    try{
    const user = await Login.query().findOne({email:payload.email})
    console.log(user)
        try{
             const compare =await bcrypt.compare(payload.userPassword,user.userPassword)
             console.log(compare)
             if(compare) return jwt.sign(JSON.stringify(user),'RESTFULAPIs')
             else return false
        }
        catch(err){
            return err
        }
    }
    catch(err){
        return err
    }
}