"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBudget = exports.updateBudget = exports.getBudgetById = exports.getAllBudgets = exports.createBudget = void 0;
const budget_schemas_1 = require("../schemas/budget-schemas");
const app_err_1 = require("../utils/app-err");
const budjet_1 = require("../models/budjet");
// Create Budget
const createBudget = async (req, res, next) => {
    try {
        const validatedData = budget_schemas_1.CreateBudgetSchema.parse(req.body);
        const budget = await budjet_1.Budjets.create(validatedData);
        return res.status(201).json({
            status: "success",
            data: budget
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to create budget", 400));
    }
};
exports.createBudget = createBudget;
// Get All Budgets
const getAllBudgets = async (req, res, next) => {
    try {
        const { memberId } = req.query;
        console.log(memberId);
        const budgets = await budjet_1.Budjets.find({
            memberId
        })
            .populate('memberId')
            .populate('categoryId');
        return res.status(200).json({
            status: "success",
            data: budgets
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to fetch budgets", 400));
    }
};
exports.getAllBudgets = getAllBudgets;
// Get Budget by ID
const getBudgetById = async (req, res, next) => {
    try {
        const { id } = budget_schemas_1.BudgetIdSchema.parse({ id: req.params.id });
        const budget = await budjet_1.Budjets.findById(id)
            .populate('memberId')
            .populate('categoryId');
        if (!budget) {
            return next((0, app_err_1.AppErr)("Budget not found", 404));
        }
        return res.status(200).json({
            status: "success",
            data: budget
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to fetch budget", 400));
    }
};
exports.getBudgetById = getBudgetById;
// Update Budget
const updateBudget = async (req, res, next) => {
    try {
        const { id } = budget_schemas_1.BudgetIdSchema.parse({ id: req.params.id });
        const validatedData = budget_schemas_1.UpdateBudgetSchema.parse(req.body);
        const budget = await budjet_1.Budjets.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true
        });
        if (!budget) {
            return next((0, app_err_1.AppErr)("Budget not found", 404));
        }
        return res.status(200).json({
            status: "success",
            data: budget
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to update budget", 400));
    }
};
exports.updateBudget = updateBudget;
// Delete Budget
const deleteBudget = async (req, res, next) => {
    try {
        const { id } = budget_schemas_1.BudgetIdSchema.parse({ id: req.params.id });
        const budget = await budjet_1.Budjets.findByIdAndDelete(id);
        if (!budget) {
            return next((0, app_err_1.AppErr)("Budget not found", 404));
        }
        return res.status(200).json({
            status: "success",
            message: "Budget deleted successfully"
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to delete budget", 400));
    }
};
exports.deleteBudget = deleteBudget;
