"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const error_1 = __importDefault(require("../containsError/error"));
const userRoutes = (0, express_1.Router)();
userRoutes.get("/:username", (0, error_1.default)((user_controller_1.UserController.PersonalUser)));
userRoutes.post("/add/status-personal", (0, error_1.default)((user_controller_1.UserController.addStatusInPersonal)));
userRoutes.post('/add/status-home', (0, error_1.default)((user_controller_1.UserController.addStatusInHome)));
userRoutes.get("/delete/:id", (0, error_1.default)((user_controller_1.UserController.deleteStatusInPersonal)));
userRoutes.get("/update/:id", (0, error_1.default)((user_controller_1.UserController.updateStatusInPersonal)));
userRoutes.post("/update", (0, error_1.default)((user_controller_1.UserController.updateStatusInPersonal)));
exports.default = userRoutes;
//# sourceMappingURL=user.router.js.map