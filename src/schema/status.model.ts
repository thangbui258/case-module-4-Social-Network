
import mongoose, {Schema} from "mongoose";


const statusSchema = new mongoose.Schema({
    content: String,
    user: {type:Schema.Types.ObjectId,ref:'User'}

})

const Status = mongoose.model("Status", statusSchema)

export {Status};
