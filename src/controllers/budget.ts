import { Request, Response, NextFunction } from "express";
import { CreateBudgetSchema, BudgetIdSchema, UpdateBudgetSchema } from "../schemas/budget-schemas";
import { AppErr } from "../utils/app-err";
import { Budjets } from "../models/budjet";

// Create Budget
export const createBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateBudgetSchema.parse(req.body);
        const budget = await Budjets.create(validatedData);
        
        return res.status(201).json({
            status: "success",
            data: budget
        });
    } catch (error) {
        return next(AppErr("Failed to create budget", 400));
    }
};

// Get All Budgets
export const getAllBudgets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {memberId} = req.query;
        console.log(memberId);
        const budgets = await Budjets.find({
            memberId
        })
            .populate('memberId')
            .populate('categoryId');
        
        return res.status(200).json({
            status: "success",
            data: budgets
        });
    } catch (error) {
        return next(AppErr("Failed to fetch budgets", 400));
    }
};

// Get Budget by ID
export const getBudgetById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = BudgetIdSchema.parse({ id: req.params.id });
        const budget = await Budjets.findById(id)
            .populate('memberId')
            .populate('categoryId');
        
        if (!budget) {
            return next(AppErr("Budget not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            data: budget
        });
    } catch (error) {
        return next(AppErr("Failed to fetch budget", 400));
    }
};

// Update Budget
export const updateBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = BudgetIdSchema.parse({ id: req.params.id });
        const validatedData = UpdateBudgetSchema.parse(req.body);
        
        const budget = await Budjets.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true
        });
        
        if (!budget) {
            return next(AppErr("Budget not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            data: budget
        });
    } catch (error) {
        return next(AppErr("Failed to update budget", 400));
    }
};

// Delete Budget
export const deleteBudget = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = BudgetIdSchema.parse({ id: req.params.id });
        const budget = await Budjets.findByIdAndDelete(id);
        
        if (!budget) {
            return next(AppErr("Budget not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            message: "Budget deleted successfully"
        });
    } catch (error) {
        return next(AppErr("Failed to delete budget", 400));
    }
}; 