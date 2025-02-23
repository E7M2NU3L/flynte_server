import http from "http";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { globalErrHandler } from "./middlewares/global-err";
import AuthRouter from "./routes/auth";
import { dbConnect } from "./config/dbConnect";
import session from 'express-session';
import passport from 'passport';
import { initPassport } from './config/passport_connect';
import { OverviewRouter } from "./routes/overview";
import memberRouter from "./routes/member";
import transactionsRouter from "./routes/transactions";
import categoryRouter from "./routes/category";
import budgetRouter from "./routes/budget";
import accountRouter from "./routes/account";

// dotenv configuration
dotenv.config();
initPassport();

// port
const port = process.env.PORT || 5000;

// express app instance
const app = express();

// db connection
dbConnect();

// app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    name : "user",
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: "none", // Required for cross-origin cookies
        maxAge: 1000 * 60 * 60 * 3,
    }
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    credentials : true,
    origin : process.env.CLIENT_ENDPOINT ?? "http://localhost:5173",
    methods : "GET,POST,PUT,DELETE,PATCH"
}));
app.use(morgan('combined'));

app.set('trust proxy', 1);

// server
const server = http.createServer(app);

// routes // /api/v1/contracts/delete/${id}
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/overview", OverviewRouter);
app.use("/api/v1/member", memberRouter);
app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/transactions", transactionsRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/budget", budgetRouter);

// custom middlewares
app.use(globalErrHandler);

// starting the server
server.listen(port, () => {
    console.log(`app is running on the port: ${port}`);
});