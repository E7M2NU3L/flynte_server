"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Members = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MemberProfileSchema = new mongoose_1.default.Schema({
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
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
exports.Members = mongoose_1.default.model('MemberProfile', MemberProfileSchema);
