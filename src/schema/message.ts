import mongoose, {Schema} from "mongoose";


const messageSchema = new mongoose.Schema({
    idSend: String,
    idReceive: String,
    time: {
        type: Date,
        default: Date.now
    },
    chat: String

})

const Message = mongoose.model("Message", messageSchema)

export default Message;
