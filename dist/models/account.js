"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AccountSchema = new mongoose_1.default.Schema({
    memberId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'MemberProfile', required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ['Bank', 'Wallet', 'Cash'], required: true },
    balance: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
}, { timestamps: true });
exports.Account = mongoose_1.default.model('Account', AccountSchema);
