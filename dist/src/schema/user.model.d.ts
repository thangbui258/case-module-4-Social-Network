import mongoose from "mongoose";
declare const User: mongoose.Model<{
    username: string;
    password: string;
    admin: boolean;
    google_id?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    username: string;
    password: string;
    admin: boolean;
    google_id?: string;
}>>;
export { User };
