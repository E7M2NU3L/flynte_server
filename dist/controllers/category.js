"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const category_1 = require("../models/category");
const category_schemas_1 = require("../schemas/category-schemas");
const app_err_1 = require("../utils/app-err");
// Create Category
const createCategory = async (req, res, next) => {
    try {
        const validatedData = category_schemas_1.CreateCategorySchema.parse(req.body);
        const category = await category_1.Category.create(validatedData);
        return res.status(201).json({
            status: "success",
            data: category
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to create category", 400));
    }
};
exports.createCategory = createCategory;
// Get All Categories
const getAllCategories = async (req, res, next) => {
    try {
        const { memberId } = req.query;
        const categories = await category_1.Category.find({
            createdBy: memberId
        }).populate('createdBy');
        return res.status(200).json({
            status: "success",
            data: categories
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to fetch categories", 400));
    }
};
exports.getAllCategories = getAllCategories;
// Get Category by ID
const getCategoryById = async (req, res, next) => {
    try {
        const { id } = category_schemas_1.CategoryIdSchema.parse({ id: req.params.id });
        const category = await category_1.Category.findById(id).populate('createdBy');
        if (!category) {
            return next((0, app_err_1.AppErr)("Category not found", 404));
        }
        return res.status(200).json({
            status: "success",
            data: category
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to fetch category", 400));
    }
};
exports.getCategoryById = getCategoryById;
// Update Category
const updateCategory = async (req, res, next) => {
    try {
        const { id } = category_schemas_1.CategoryIdSchema.parse({ id: req.params.id });
        const validatedData = category_schemas_1.UpdateCategorySchema.parse(req.body);
        const category = await category_1.Category.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true
        });
        if (!category) {
            return next((0, app_err_1.AppErr)("Category not found", 404));
        }
        return res.status(200).json({
            status: "success",
            data: category
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to update category", 400));
    }
};
exports.updateCategory = updateCategory;
// Delete Category
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = category_schemas_1.CategoryIdSchema.parse({ id: req.params.id });
        const category = await category_1.Category.findByIdAndDelete(id);
        if (!category) {
            return next((0, app_err_1.AppErr)("Category not found", 404));
        }
        return res.status(200).json({
            status: "success",
            message: "Category deleted successfully"
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to delete category", 400));
    }
};
exports.deleteCategory = deleteCategory;
