"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_model_1 = require("../schema/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
class AuthController {
    static async login(req, res) {
        let cookieClient = cookie_1.default.parse(req.headers.cookie || '');
        if (cookieClient.cookie_user) {
            jsonwebtoken_1.default.verify(cookieClient.cookie_user, process.env.NUMBER_SECRET_TOKEN, (err, decoded) => {
                if (err) {
                    return res.json({ message: err.message });
                }
                else {
                    if (decoded.admin === true) {
                        res.redirect('/auth/admin');
                    }
                    else {
                        res.redirect('/auth/user');
                    }
                }
            });
        }
        await res.render('./user/login', { registerSuccess: "none",
            wrongPassword: 'none' });
    }
    static async logout(req, res) {
        res.cookie("cookie_user", '');
        return res.render('./user/login', { registerSuccess: 'none',
            wrongPassword: 'none' });
    }
    static async register(req, res) {
        if (req.method === 'GET') {
            return res.render('./user/register', { passwordIncorrect: 'none',
                userExist: "none" });
        }
        else {
            const user = await user_model_1.User.findOne({ username: req.body.username });
            if (!user) {
                let arrayPass = req.body.password;
                if (arrayPass[0] === arrayPass[1]) {
                    const passwordHash = await bcrypt_1.default.hash(req.body.password[0], 10);
                    let userData = { username: req.body.username, password: passwordHash };
                    const newUser = await user_model_1.User.create(userData);
                    return res.render('./user/login', { registerSuccess: 'block',
                        wrongPassword: 'none' });
                }
                else {
                    res.render('./user/register', { passwordIncorrect: 'block',
                        userExist: "none" });
                }
            }
            else {
                res.render('./user/register', { passwordIncorrect: 'none',
                    userExist: "block" });
            }
        }
    }
    static async error(req, res) {
        res.render('./user/error');
    }
    static async grantAdminOrUser(req, res) {
        if (req.body.Admin === 'choose') {
            res.redirect('/auth/admin');
        }
        else {
            await user_model_1.User.updateOne({ username: req.body.nameUser }, { admin: req.body.Admin });
            res.redirect('/auth/admin');
        }
    }
    static createTokenAndSetCookie(req, res, payload) {
        const token = jsonwebtoken_1.default.sign(payload, process.env.NUMBER_SECRET_TOKEN, { expiresIn: 9999 });
        res.cookie("cookie_user", token);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map