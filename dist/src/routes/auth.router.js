"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const error_1 = __importDefault(require("../containsError/error"));
const user_controller_1 = require("../controller/user.controller");
router.get('/user/login', (0, error_1.default)(user_controller_1.UserController.login));
router.post("/user/login", (0, error_1.default)(user_controller_1.UserController.login));
router.get('/user/register', (0, error_1.default)(user_controller_1.UserController.register));
router.post("/user/register", (0, error_1.default)(user_controller_1.UserController.register));
exports.default = router;
//# sourceMappingURL=auth.router.js.map