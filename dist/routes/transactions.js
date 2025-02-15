"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsRouter = void 0;
const express_1 = __importDefault(require("express"));
const transaction_1 = require("../controllers/transaction");
exports.transactionsRouter = express_1.default.Router();
// Create a new transaction
exports.transactionsRouter.post('/', async (req, res, next) => {
    try {
        await (0, transaction_1.createTransaction)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Get all transactions
exports.transactionsRouter.get('/', async (req, res, next) => {
    try {
        await (0, transaction_1.getAllTransactions)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Get a transaction by ID
exports.transactionsRouter.get('/:id', async (req, res, next) => {
    try {
        await (0, transaction_1.getTransactionById)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Update a transaction by ID
exports.transactionsRouter.put('/:id', async (req, res, next) => {
    try {
        await (0, transaction_1.updateTransaction)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Delete a transaction by ID
exports.transactionsRouter.delete('/:id', async (req, res, next) => {
    try {
        await (0, transaction_1.deleteTransaction)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.default = exports.transactionsRouter;
