import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    description: { type: String, required: false },
    parentCategory: { type: String, ref: 'Category', required: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'MemberProfile', required: true },
    isDefault: { type: Boolean, default: false },
  }, { timestamps: true });
  
export const Category = mongoose.model('Category', CategorySchema);
  