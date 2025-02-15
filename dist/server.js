"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const global_err_1 = require("./middlewares/global-err");
const auth_1 = __importDefault(require("./routes/auth"));
const dbConnect_1 = require("./config/dbConnect");
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_connect_1 = require("./config/passport_connect");
const overview_1 = require("./routes/overview");
const member_1 = __importDefault(require("./routes/member"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const category_1 = __importDefault(require("./routes/category"));
const budget_1 = __importDefault(require("./routes/budget"));
const account_1 = __importDefault(require("./routes/account"));
// dotenv configuration
dotenv_1.default.config();
(0, passport_connect_1.initPassport)();
// port
const port = process.env.PORT || 5000;
// express app instance
const app = (0, express_1.default)();
// db connection
(0, dbConnect_1.dbConnect)();
// app middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cookie_session_1.default)({
    name: 'google-auth-session',
    keys: ['xcontour'],
    maxAge: 24 * 60 * 60 * 100
}));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "user",
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 3,
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "https://flynte.vercel.app",
    methods: "GET,POST,PUT,DELETE,PATCH"
}));
app.use((0, morgan_1.default)('combined'));
// server
const server = http_1.default.createServer(app);
// routes // /api/v1/contracts/delete/${id}
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/overview", overview_1.OverviewRouter);
app.use("/api/v1/member", member_1.default);
app.use("/api/v1/accounts", account_1.default);
app.use("/api/v1/transactions", transactions_1.default);
app.use("/api/v1/category", category_1.default);
app.use("/api/v1/budget", budget_1.default);
// custom middlewares
app.use(global_err_1.globalErrHandler);
// starting the server
server.listen(port, () => {
    console.log(`app is running on the port: ${port}`);
});
