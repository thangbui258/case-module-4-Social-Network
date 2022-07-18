"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        default: 0,
        required: false
    },
    admin: {
        type: Boolean,
        default: true
    },
    google_id: {
        type: String,
        default: 0
    },
});
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
//# sourceMappingURL=user.model.js.map