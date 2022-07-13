import mongoose from "mongoose";


const userSchema =new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    admin:{
        type:Boolean,
        default:false
    }

})

const User=mongoose.model('User',userSchema)
export {User}