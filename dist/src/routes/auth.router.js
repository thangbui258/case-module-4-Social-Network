"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
const error_1 = __importDefault(require("../containsError/error"));
const auth_controller_1 = require("../controller/auth.controller");
router.get('/login', (0, error_1.default)(auth_controller_1.AuthController.login));
router.post("/login", (0, error_1.default)(auth_controller_1.AuthController.login));
router.get('/register', (0, error_1.default)(auth_controller_1.AuthController.register));
router.post("/register", (0, error_1.default)(auth_controller_1.AuthController.register));
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), async function (req, res) {
    res.render('./user/user');
});
exports.default = router;
//# sourceMappingURL=auth.router.js.map