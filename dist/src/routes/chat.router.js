"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controller/chat.controller");
const router = (0, express_1.Router)();
let chatController = new chat_controller_1.ChatController();
router.get('/:id_user', (req, res, next) => {
    chatController.getMessage(req, res, next);
});
router.post("/message", chatController.saveMessage);
exports.default = router;
//# sourceMappingURL=chat.router.js.map