"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckLogin = void 0;
const user_model_1 = require("../schema/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_controller_1 = require("../controller/auth.controller");
class CheckLogin {
    static async checkUserOrAdminToDirectional(req, res, next) {
        const user = await user_model_1.User.findOne({ username: req.body.username });
        if (user) {
            const comparePass = await bcrypt_1.default.compare(req.body.password, user.password);
            if (!comparePass) {
                return res.render('./user/login', { registerSuccess: 'none',
                    wrongPassword: 'block' });
            }
            let payload = {
                user_id: user.id,
                username: user.username,
                admin: user.admin,
                google_id: user.google_id
            };
            await auth_controller_1.AuthController.createTokenAndSetCookie(req, res, payload);
            if (user.admin === true) {
                res.redirect("/auth/admin");
            }
            else {
                res.redirect("/auth/user");
            }
        }
        else {
            return res.json({ err: 'wrong user' });
        }
    }
}
exports.CheckLogin = CheckLogin;
//# sourceMappingURL=checkLogin.js.map