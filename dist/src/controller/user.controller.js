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
    async showPagePerson(req, res) {
        let user = await user_model_1.User.findOne({ username: req.params.username });
        const idUser = user._id;
        console.log(idUser);
        const statuses = await status_model_1.Status.find({ user: idUser });
        let data = {
            idUser: idUser,
            statuses: statuses
        };
        res.render('./user/personal', { data: data });
    }
    async addStatus(req, res) {
        const userID = req.body.ID;
        console.log(userID);
        const userSelect = await user_model_1.User.find({ _id: userID });
        const statusNew = new status_model_1.Status({
            content: req.body.content,
            user: userSelect[0]
        });
        await statusNew.save();
        res.redirect(`/user/${userSelect[0].username}`);
    }
    takeNameUser(req, res, next) {
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