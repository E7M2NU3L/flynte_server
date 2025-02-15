"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetIdSchema = exports.UpdateBudgetSchema = exports.CreateBudgetSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateBudgetSchema = zod_1.default.object({
    memberId: zod_1.default.string().optional(),
    categoryId: zod_1.default.string(),
    amount: zod_1.default.number().positive(),
    timePeriod: zod_1.default.enum(['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']),
    spent: zod_1.default.number().default(0),
    notes: zod_1.default.string().optional()
});
exports.UpdateBudgetSchema = exports.CreateBudgetSchema.partial();
exports.BudgetIdSchema = zod_1.default.object({
    id: zod_1.default.string()
});
