import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'MemberProfile', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Income', 'Expense'], required: true },
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI'], required: true },
    notes: { type: String, required: false },
    isRecurring: { type: Boolean, default: false },
    recurrenceFrequency: { 
      type: String, 
      enum: ['Daily', 'Weekly', 'Monthly', 'Yearly', 'None'], 
      default : 'None' 
    },
    status: { type: String, enum: ['Completed', 'Pending', 'Failed'], default: 'Completed' },
  }, { timestamps: true });
  
export const Transaction = mongoose.model('Transaction', TransactionSchema);
  
  