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
        let nameReceive = req.params.username;
        let Data = req.headers.cookie;
        let accessToken = Data.split('=')[1];
        jsonwebtoken_1.default.verify(accessToken, process.env.NUMBER_SECRET_TOKEN, async (err, decoded) => {
            if (err) {
                return res.json({ message: err.message });
            }
            else {
                let nameSend = decoded.username;
                let messages1 = await message_1.default.find({
                    nameSend: nameSend,
                    nameReceive: nameReceive
                });
                let messages2 = await message_1.default.find({
                    nameSend: nameReceive,
                    nameReceive: nameSend
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
                console.log(messages);
                res.json(messages);
            }
        });
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map