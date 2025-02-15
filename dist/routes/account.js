"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = require("../controllers/account");
const accountRouter = express_1.default.Router();
// Create a new account
accountRouter.post('/', async (req, res, next) => {
    try {
        await (0, account_1.createAccount)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Get all accounts
accountRouter.get('/', async (req, res, next) => {
    try {
        await (0, account_1.getAllAccounts)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Get an account by ID
accountRouter.get('/:id', async (req, res, next) => {
    try {
        await (0, account_1.getAccountById)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Update an account by ID
accountRouter.patch('/:id', async (req, res, next) => {
    try {
        await (0, account_1.updateAccount)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Delete an account by ID
accountRouter.delete('/:id', async (req, res, next) => {
    try {
        await (0, account_1.deleteAccount)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.default = accountRouter;
