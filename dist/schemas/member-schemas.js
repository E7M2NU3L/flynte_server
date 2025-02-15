"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberIdSchema = exports.UpdateMemberSchema = exports.CreateMemberSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateMemberSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email().optional(),
    phone: zod_1.default.string(),
    role: zod_1.default.enum(['Parent', 'Child', 'Guardian']),
    profileImage: zod_1.default.string().optional(),
    gender: zod_1.default.enum(['Male', 'Female', 'Non-binary']),
    dateOfBirth: zod_1.default.string().optional(),
    isPrimary: zod_1.default.boolean().optional().default(false),
    income: zod_1.default.number().optional(),
    joinedDate: zod_1.default.string().optional().default(new Date().toISOString()),
    status: zod_1.default.enum(['Active', 'Inactive', 'Removed']).optional().default('Active'),
    notes: zod_1.default.string().optional(),
});
exports.UpdateMemberSchema = exports.CreateMemberSchema.partial();
exports.MemberIdSchema = zod_1.default.object({
    id: zod_1.default.string()
});
