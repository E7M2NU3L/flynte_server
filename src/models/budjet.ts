const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  memberId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MemberProfile', 
    required: false // Optional field for personal budgets
  },
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true // The total budget amount for the specified category
  },
  timePeriod: { 
    type: String, 
    enum: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'], 
    required: true // Defines the duration of the budget
  },
  spent: { 
    type: Number, 
    default: 0, 
    required: true // Tracks how much of the budget has been spent
  },
  notes: { 
    type: String, 
    default: null 
  },
}, { timestamps: true });

export const Budjets = mongoose.model('Budget', BudgetSchema);
