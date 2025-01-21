import { Request, Response, NextFunction } from "express";
import { Category } from "../models/category";
import { CreateCategorySchema, CategoryIdSchema, UpdateCategorySchema } from "../schemas/category-schemas";
import { AppErr } from "../utils/app-err";

// Create Category
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = CreateCategorySchema.parse(req.body);
        const category = await Category.create(validatedData);
        
        return res.status(201).json({
            status: "success",
            data: category
        });
    } catch (error) {
        return next(AppErr("Failed to create category", 400));
    }
};

// Get All Categories
export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {memberId} = req.query;
        const categories = await Category.find({
            createdBy: memberId
        }).populate('createdBy');
        
        return res.status(200).json({
            status: "success",
            data: categories
        });
    } catch (error) {
        return next(AppErr("Failed to fetch categories", 400));
    }
};

// Get Category by ID
export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = CategoryIdSchema.parse({ id: req.params.id });
        const category = await Category.findById(id).populate('createdBy');
        
        if (!category) {
            return next(AppErr("Category not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            data: category
        });
    } catch (error) {
        return next(AppErr("Failed to fetch category", 400));
    }
};

// Update Category
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = CategoryIdSchema.parse({ id: req.params.id });
        const validatedData = UpdateCategorySchema.parse(req.body);
        
        const category = await Category.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true
        });
        
        if (!category) {
            return next(AppErr("Category not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            data: category
        });
    } catch (error) {
        return next(AppErr("Failed to update category", 400));
    }
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = CategoryIdSchema.parse({ id: req.params.id });
        const category = await Category.findByIdAndDelete(id);
        
        if (!category) {
            return next(AppErr("Category not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            message: "Category deleted successfully"
        });
    } catch (error) {
        return next(AppErr("Failed to delete category", 400));
    }
};
