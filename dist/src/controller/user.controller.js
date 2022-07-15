"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const status_model_1 = require("../schema/status.model");
const user_model_1 = require("../schema/user.model");
class UserController {
    static async showPagePersonal(req, res) {
        let Data = req.headers.cookie;
        if (Data) {
            let accessToken = Data.split('=')[1];
            jsonwebtoken_1.default.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
                if (err) {
                    return res.json({ message: err.message });
                }
                else {
                    let payload = decoded;
                    let idUser = payload.user_id;
                    const name = req.params.username;
                    const userSelect = await user_model_1.User.findOne({ username: name });
                    const statuses = await status_model_1.Status.find({ user: userSelect._id });
                    const listUser = await user_model_1.User.find();
                    if (payload.username == req.params.username) {
                        let data = {
                            block: 'block',
                            idUser: idUser,
                            statuses: statuses,
                            listUser: listUser
                        };
                        res.render('./user/personal', { data: data });
                    }
                    else {
                        let data = {
                            block: 'none',
                            idUser: idUser,
                            statuses: statuses,
                            listUser: listUser
                        };
                        res.render('./user/personal', { data: data });
                    }
                }
            });
        }
        else {
            res.json({ message: "chua dang nhap" });
        }
    }
    static async addStatus(req, res) {
        const userID = req.body.ID;
        const userSelect = await user_model_1.User.find({ _id: userID });
        const statusNew = new status_model_1.Status({
            content: req.body.content,
            user: userSelect[0]
        });
        await statusNew.save();
        res.redirect(`/user/${userSelect[0].username}`);
    }
    static async addStatusHome(req, res) {
        const userID = req.body.ID;
        const userSelect = await user_model_1.User.find({ _id: userID });
        const statusNew = new status_model_1.Status({
            content: req.body.content,
            user: userSelect[0]
        });
        await statusNew.save();
        res.redirect('/auth/home');
    }
    static async deleteStatus(req, res) {
        let status = await status_model_1.Status.findOne({ _id: req.params.id });
        let userID = status.user;
        let user = await user_model_1.User.findOne({ _id: userID });
        let nameUser = user.username;
        await status_model_1.Status.deleteOne({ _id: req.params.id });
        res.redirect(`/user/${nameUser}`);
    }
    static async updateStatus(req, res) {
        if (req.method === "GET") {
            let status = await status_model_1.Status.findOne({ _id: req.params.id });
            let userID = status.user;
            let user = await user_model_1.User.findOne({ _id: userID });
            let nameUser = user.username;
            let data = {
                userName: nameUser,
                idStatus: req.params.id,
                contentStatus: status.content
            };
            res.render('./user/updateStatus', { data: data });
        }
        else {
            console.log(req.body);
            let userUpdateStatus = req.body.userUpdate;
            let idStatusUpdate = req.body.idStatus;
            let contentStatusUpdate = req.body.statusUpdate;
            await status_model_1.Status.updateOne({ _id: idStatusUpdate }, { content: contentStatusUpdate });
            res.redirect(`/user/${userUpdateStatus}`);
        }
    }
    static takeNameUser(req, res, next) {
        let accessToken = req.headers.cookie.cooki_user;
        jsonwebtoken_1.default.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, (err, decoded) => {
            if (err) {
                return res.json({ message: err.message });
            }
            else {
                let name = decoded.username;
                next();
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map