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
const user_controller_1 = require("../controller/user.controller");
const checkLogin_1 = require("../middleware/checkLogin");
router.get('/', (0, error_1.default)(auth_controller_1.AuthController.login));
router.post('/login', (0, error_1.default)(checkLogin_1.CheckLogin.checkUserOrAdminToDirectional));
router.get('/user', (0, error_1.default)(user_controller_1.UserController.homeUser));
router.get('/admin', (0, error_1.default)(user_controller_1.UserController.homeAdmin));
router.get('/admin/delete/:username', (0, error_1.default)(user_controller_1.UserController.deleteUser));
router.get('/logout', (0, error_1.default)(auth_controller_1.AuthController.logout));
router.get('/register', (0, error_1.default)(auth_controller_1.AuthController.register));
router.post("/register", (0, error_1.default)(auth_controller_1.AuthController.register));
router.post('/admin/grant', (0, error_1.default)(auth_controller_1.AuthController.grantAdminOrUser));
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/auth/login' }), async function (req, res) {
    res.redirect('/auth/home');
});
exports.default = router;
//# sourceMappingURL=auth.router.js.map