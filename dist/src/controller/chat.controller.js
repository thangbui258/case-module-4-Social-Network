"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const message_1 = __importDefault(require("../schema/message"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ChatController {
    getMessage(req, res, next) {
        let idReceive = req.params.id_user;
        let Data = req.headers.cookie;
        let accessToken = Data.split('=')[1];
        jsonwebtoken_1.default.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
            if (err) {
                return res.json({ message: err.message });
            }
            else {
                let idSend = decoded.user_id;
                let messages1 = await message_1.default.find({
                    idSend: idSend,
                    idReceive: idReceive
                });
                let messages2 = await message_1.default.find({
                    idSend: idReceive,
                    idReceive: idSend
                });
                let messages = messages1.concat(messages2);
                for (let i = 0; i < messages.length; i++) {
                    for (let j = i + 1; j < messages.length; j++) {
                        if (messages[j].time < messages[i].time) {
                            let temp = messages[j];
                            messages[j] = messages[i];
                            messages[i] = temp;
                        }
                    }
                }
                res.json(messages);
            }
        });
    }
    async saveMessage(req, res) {
        let Data = req.headers.cookie;
        let accessToken = Data.split('=')[1];
        jsonwebtoken_1.default.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
            if (err) {
                return res.json({ message: err.message });
            }
            else {
                let idSend = decoded.user_id;
                const messageNew = new message_1.default({
                    idSend: idSend,
                    idReceive: req.body.idReceive,
                    chat: req.body.message
                });
                await messageNew.save();
                res.json("oke");
            }
        });
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map