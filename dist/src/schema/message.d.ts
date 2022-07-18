import mongoose from "mongoose";
declare const Message: mongoose.Model<{
    nameSend?: string;
    nameReceive?: string;
    chat?: string;
    time?: Date;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    nameSend?: string;
    nameReceive?: string;
    chat?: string;
    time?: Date;
}>>;
export default Message;
