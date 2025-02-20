import mongoose from "mongoose";

const MemberProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: true },
  role: { type: String, enum: ['Parent', 'Child', 'Guardian'], required: true },
  profileImage: { type: String, required: false },
  gender: { type: String, enum: ['Male', 'Female', 'Non-binary'], required: true },
  dateOfBirth: { type: Date, required: false },
  isPrimary: { type: Boolean, default: false },
  income: { type: Number, required: false },
  joinedDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Active', 'Inactive', 'Removed'], default: 'Active' },
  notes: { type: String, required: false },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  }
}, { timestamps: true });

export const Members = mongoose.model('MemberProfile', MemberProfileSchema);
