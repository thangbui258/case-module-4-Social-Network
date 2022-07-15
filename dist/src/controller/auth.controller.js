"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_model_1 = require("../schema/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const status_model_1 = require("../schema/status.model");
class AuthController {
    static async login(req, res) {
        res.cookie("cookie_user", '');
        return res.render('./user/login');
    }
    static async home(req, res) {
        if (req.method === "GET") {
            let data = req.headers.cookie;
            if (data) {
                let accessToken = data.split('=')[1];
                jsonwebtoken_1.default.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
                    if (err) {
                        return res.json({ message: err.message });
                    }
                    else {
                        let payload = decoded;
                        const listUser = await user_model_1.User.find();
                        const statuses = await status_model_1.Status.find();
                        let data = {
                            payload: payload,
                            statuses: statuses,
                            listUser: listUser
                        };
                        res.render("./user/home", { data: data });
                    }
                });
            }
            else {
                res.json({ message: "chua dang nhap" });
            }
        }
        else {
            const user = await user_model_1.User.findOne({ username: req.body.username });
            if (user) {
                const comparePass = await bcrypt_1.default.compare(req.body.password, user.password);
                if (!comparePass) {
                    return res.json({ code: 404, message: "password wrong", });
                }
                let payload = {
                    user_id: user.id,
                    username: user.username,
                    admin: user.admin,
                    google_id: user.google_id
                };
                await AuthController.createTokenAndSetCookie(req, res, payload);
                if (user.admin === true) {
                }
                else {
                    const listUser = await user_model_1.User.find();
                    const statuses = await status_model_1.Status.find();
                    let data = {
                        payload: payload,
                        statuses: statuses,
                        listUser: listUser
                    };
                    res.render("./user/home", { data: data });
                }
            }
            else {
                return res.json({ err: 'wrong user' });
            }
        }
    }
    static async register(req, res) {
        if (req.method === 'GET') {
            return res.render('./user/register');
        }
        else {
            const user = await user_model_1.User.findOne({ username: req.body.username });
            if (!user) {
                let arrayPass = req.body.password;
                if (arrayPass[0] === arrayPass[1]) {
                    const passwordHash = await bcrypt_1.default.hash(req.body.password[0], 10);
                    let userData = { username: req.body.username, password: passwordHash };
                    const newUser = await user_model_1.User.create(userData);
                    return res.render('./user/login');
                }
                else {
                    res.json({ message: "mat khau khong khop" });
                }
            }
            else {
                res.json({ err: "User exited" });
            }
        }
    }
    static createTokenAndSetCookie(req, res, payload) {
        const token = jsonwebtoken_1.default.sign(payload, process.env.NUMBER_SECRET_TOKEN, { expiresIn: 9999 });
        res.cookie("cookie_user", token);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map