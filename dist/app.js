"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set('views', './src/views');
mongoose_1.default.connect(`${process.env.DB_MONGO}`)
    .then(() => {
    // tslint:disable-next-line:no-console
    console.log('DB Connected!');
})
    .catch(error => {
    // tslint:disable-next-line:no-console
    console.log('DB connection error:', error.message);
});
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.render('./user/register');
});
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log("http://localhost:" + PORT);
});
//# sourceMappingURL=app.js.map