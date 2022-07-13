"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.News = void 0;
const mongoose_1 = require("mongoose");
const newsSchema = new mongoose_1.Schema({
    title: String,
    content: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }
});
const News = (0, mongoose_1.model)('News', newsSchema);
exports.News = News;
//# sourceMappingURL=news.js.map