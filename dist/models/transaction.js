"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TransactionSchema = new mongoose_1.default.Schema({
    memberId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'MemberProfile', required: true },
    categoryId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI'], required: true },
    notes: { type: String, required: false },
    isRecurring: { type: Boolean, default: false },
    recurrenceFrequency: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly', 'None'],
        default: 'None'
    },
    status: { type: String, enum: ['Completed', 'Pending', 'Failed'], default: 'Completed' },
}, { timestamps: true });
exports.Transaction = mongoose_1.default.model('Transaction', TransactionSchema);
