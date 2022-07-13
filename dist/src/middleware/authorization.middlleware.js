"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Auth {
    static async isAdmin(req, res, next) {
        let accessToken = req.body.access_token;
        if (accessToken) {
            jsonwebtoken_1.default.verify(accessToken, "123456789", (err, decoded) => {
                if (err) {
                    return res.json({ message: err.message });
                }
                else {
                    if (decoded.admin === true) {
                        next();
                    }
                    else {
                        res.json({ message: "ko du quyen" });
                    }
                }
            });
        }
        else {
            return res.json({ message: "no access token" });
        }
    }
}
exports.Auth = Auth;
//# sourceMappingURL=authorization.middlleware.js.map