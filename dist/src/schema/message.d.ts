import mongoose from "mongoose";
declare const Message: mongoose.Model<{
    idSend?: string;
    idReceive?: string;
    chat?: string;
    time?: number;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    idSend?: string;
    idReceive?: string;
    chat?: string;
    time?: number;
}>>;
export default Message;
