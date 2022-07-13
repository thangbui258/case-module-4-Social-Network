"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = 8080;
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.set('view engine', 'ejs');
app.set("views", path_1.default.join(__dirname, "views"));
mongoose_1.default.connect(`${process.env.DB_MONGO}`, () => {
    // tslint:disable-next-line:no-console
    console.log("connect DB successfully");
});
// app.use('/user',userRouter)
app.get('/', (req, res) => {
    res.render('./user/register');
});
app.listen(port);
//# sourceMappingURL=app.js.map