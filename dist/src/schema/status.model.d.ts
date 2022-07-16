import mongoose from "mongoose";
declare const Status: mongoose.Model<{
    like: number;
    content?: string;
    user?: mongoose.Types.ObjectId;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    like: number;
    content?: string;
    user?: mongoose.Types.ObjectId;
}>>;
export { Status };
