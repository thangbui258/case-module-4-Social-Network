import mongoose from "mongoose";
declare const Status: mongoose.Model<{
    user?: mongoose.Types.ObjectId;
    content?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    user?: mongoose.Types.ObjectId;
    content?: string;
}>>;
export default Status;
