"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountIdSchema = exports.UpdateAccountSchema = exports.CreateAccountSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateAccountSchema = zod_1.default.object({
    memberId: zod_1.default.string(),
    name: zod_1.default.string(),
    type: zod_1.default.enum(['Bank', 'Wallet', 'Cash']),
    balance: zod_1.default.number().optional().default(0),
    currency: zod_1.default.string().default('INR')
});
exports.UpdateAccountSchema = exports.CreateAccountSchema.partial();
exports.AccountIdSchema = zod_1.default.object({
    id: zod_1.default.string()
});
