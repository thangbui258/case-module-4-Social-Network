"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const userController = new user_controller_1.UserController();
const userRoutes = (0, express_1.Router)();
userRoutes.get("/:username", (req, res) => {
    userController.showPagePerson(req, res);
});
userRoutes.post("/add/status", (req, res) => {
    userController.addStatus(req, res);
});
exports.default = userRoutes;
//# sourceMappingURL=user.router.js.map