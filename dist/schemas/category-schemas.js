"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryIdSchema = exports.UpdateCategorySchema = exports.CreateCategorySchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateCategorySchema = zod_1.default.object({
    name: zod_1.default.string(),
    type: zod_1.default.enum(['Income', 'Expense']),
    description: zod_1.default.string().optional(),
    parentCategory: zod_1.default.string().optional(),
    createdBy: zod_1.default.string(),
    isDefault: zod_1.default.boolean().optional().default(false)
});
exports.UpdateCategorySchema = exports.CreateCategorySchema.partial();
exports.CategoryIdSchema = zod_1.default.object({
    id: zod_1.default.string()
});
