"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionIdSchema = exports.UpdateTransactionSchema = exports.CreateTransactionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateTransactionSchema = zod_1.default.object({
    memberId: zod_1.default.string(),
    categoryId: zod_1.default.string(),
    amount: zod_1.default.number().positive(),
    type: zod_1.default.enum(['Income', 'Expense']),
    date: zod_1.default.string().optional().default(new Date().toISOString()),
    paymentMethod: zod_1.default.enum(['Cash', 'Card', 'UPI']),
    notes: zod_1.default.string().optional(),
    isRecurring: zod_1.default.boolean().optional().default(false),
    recurrenceFrequency: zod_1.default.enum(['Daily', 'Weekly', 'Monthly', 'Yearly', 'None']).optional().default('None'),
    status: zod_1.default.enum(['Completed', 'Pending', 'Failed']).optional().default('Completed')
});
exports.UpdateTransactionSchema = exports.CreateTransactionSchema.partial();
exports.TransactionIdSchema = zod_1.default.object({
    id: zod_1.default.string()
});
