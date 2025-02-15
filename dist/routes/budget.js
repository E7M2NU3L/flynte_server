"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const budget_1 = require("../controllers/budget");
const budgetRouter = express_1.default.Router();
// Create a new budget
budgetRouter.post('/', async (req, res, next) => {
    try {
        await (0, budget_1.createBudget)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Get all budgets
budgetRouter.get('/', async (req, res, next) => {
    try {
        await (0, budget_1.getAllBudgets)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Get a budget by ID
budgetRouter.get('/:id', async (req, res, next) => {
    try {
        await (0, budget_1.getBudgetById)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Update a budget by ID
budgetRouter.patch('/:id', async (req, res, next) => {
    try {
        await (0, budget_1.updateBudget)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Delete a budget by ID
budgetRouter.delete('/:id', async (req, res, next) => {
    try {
        await (0, budget_1.deleteBudget)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.default = budgetRouter;
