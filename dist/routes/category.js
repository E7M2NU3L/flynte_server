"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = require("../controllers/category");
const categoryRouter = express_1.default.Router();
// Create a new category
categoryRouter.post('/', async (req, res, next) => {
    try {
        await (0, category_1.createCategory)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Get all categories
categoryRouter.get('/', async (req, res, next) => {
    try {
        await (0, category_1.getAllCategories)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Get a category by ID
categoryRouter.get('/:id', async (req, res, next) => {
    try {
        await (0, category_1.getCategoryById)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Update a category by ID
categoryRouter.put('/:id', async (req, res, next) => {
    try {
        await (0, category_1.updateCategory)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Delete a category by ID
categoryRouter.delete('/:id', async (req, res, next) => {
    try {
        await (0, category_1.deleteCategory)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.default = categoryRouter;
