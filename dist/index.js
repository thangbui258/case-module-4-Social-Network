"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_google_1 = __importDefault(require("./src/middleware/passport.google"));
const auth_router_1 = __importDefault(require("./src/routes/auth.router"));
const user_router_1 = __importDefault(require("./src/routes/user.router"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const express_error_slack_1 = __importDefault(require("express-error-slack"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const port = 3000;
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set("views", './src/views');
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGODB_URL, () => {
    console.log("connect success");
});
const rootPath = app_root_path_1.default.path;
let publicPath = path_1.default.join(rootPath, "src", "public");
app.use(express_1.default.static(publicPath));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60 * 60 }
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(passport_google_1.default.initialize());
app.use(passport_google_1.default.session());
app.use("/auth", auth_router_1.default);
app.use('/user', user_router_1.default);
app.use((0, express_error_slack_1.default)({ webhookUri: "https://hooks.slack.com/services/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" }));
app.use((err, req, res, next) => {
    if (err) {
        res.json({ message: err });
    }
});
app.listen(port, () => {
    console.log("http://localhost:" + port);
});
//# sourceMappingURL=index.js.map