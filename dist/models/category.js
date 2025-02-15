"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CategorySchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    description: { type: String, required: false },
    parentCategory: { type: String, ref: 'Category', required: false },
    createdBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'MemberProfile', required: true },
    isDefault: { type: Boolean, default: false },
}, { timestamps: true });
exports.Category = mongoose_1.default.model('Category', CategorySchema);
