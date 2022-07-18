import mongoose from "mongoose";
declare const User: mongoose.Model<{
    username: string;
    admin: boolean;
    password?: string;
    google_id?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    username: string;
    admin: boolean;
    password?: string;
    google_id?: string;
}>>;
export { User };
