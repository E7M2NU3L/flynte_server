import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'MemberProfile', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['Bank', 'Wallet', 'Cash'], required: true },
    balance: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
  }, { timestamps: true });
  
export const Account = mongoose.model('Account', AccountSchema);
  