"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 8081;
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.set('view engine', 'ejs');
app.set("views", path_1.default.join(__dirname, "views"));
// async function main() {
//     await mongoose.connect('mongodb://localhost:27017/MangXaHoi');
// }
// main()
//     .then(res => {
//         // tslint:disable-next-line:no-console
//         console.log('Connected successfully to server');
//     })
//     // tslint:disable-next-line:no-console
//     .catch(console.error)
// app.use('/user',userRouter)
app.get('/', (req, res) => {
    res.render('./layout/layout');
});
app.listen(port);
//# sourceMappingURL=app.js.map