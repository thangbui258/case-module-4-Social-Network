import mongoose from "mongoose";
declare const Status: mongoose.Model<{
    content?: string;
    user?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    content?: string;
    user?: mongoose.Types.ObjectId;
}>>;
export { Status };
