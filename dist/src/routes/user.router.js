"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/:username", user_controller_1.UserController.showPagePersonal);
userRoutes.post("/add/status", user_controller_1.UserController.addStatus);
userRoutes.get("/delete/:id", user_controller_1.UserController.deleteStatus);
userRoutes.get("/update/:id", user_controller_1.UserController.updateStatus);
userRoutes.post("/update", user_controller_1.UserController.updateStatus);
exports.default = userRoutes;
//# sourceMappingURL=user.router.js.map