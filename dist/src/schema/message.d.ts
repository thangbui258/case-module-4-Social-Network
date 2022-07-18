import mongoose from "mongoose";
declare const Message: mongoose.Model<{
    idSend?: string;
    idReceive?: string;
    chat?: string;
    time?: Date;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    idSend?: string;
    idReceive?: string;
    chat?: string;
    time?: Date;
}>>;
export default Message;
