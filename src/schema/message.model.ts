import {Schema, model} from "mongoose";

const newsSchema =new Schema({
    title:String,
    content:String,
    user:{type:Schema.Types.ObjectId, ref: "User"}
})

const News= model('News',newsSchema)
export {News}