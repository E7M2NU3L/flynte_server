"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.getMemberById = exports.getAllMembers = exports.createMember = void 0;
const member_1 = require("../models/member");
const member_schemas_1 = require("../schemas/member-schemas");
const app_err_1 = require("../utils/app-err");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create Member
const createMember = async (req, res, next) => {
    try {
        // Extract token from cookies or headers
        const token = req.cookies['token'] || req.headers.authorization?.split(" ")[1];
        console.log(token);
        // If no token found, log out gracefully
        if (!token) {
            return res.status(200).json({
                message: "User logged out (no active session).",
            });
        }
        // Verify token
        let decodedToken = null;
        try {
            decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            return res.status(200).json({
                message: "User logged out (invalid token).",
            });
        }
        ;
        console.log(decodedToken);
        const validatedData = await member_schemas_1.CreateMemberSchema.safeParseAsync(req.body);
        if (!validatedData.success) {
            res.status(404).json({
                status: "Failed",
                message: "Invalid Input credentials",
                validatedData
            });
        }
        const payload = {
            ...validatedData.data,
            user: decodedToken.id
        };
        console.log(payload);
        const member = new member_1.Members(payload);
        await member.save();
        console.log(member);
        if (!member) {
            res.status(301).json({
                status: "Failed",
                message: "Member not created, Unique data must be given",
            });
        }
        return res.status(201).json({
            status: "success",
            data: member
        });
    }
    catch (error) {
        if (error instanceof Error) {
            return next((0, app_err_1.AppErr)(error.message, 400));
        }
        else {
            return next((0, app_err_1.AppErr)("Failed to create member", 400));
        }
    }
};
exports.createMember = createMember;
// Get All Members
const getAllMembers = async (req, res, next) => {
    try {
        // Extract token from cookies or headers
        const token = req.cookies['token'] || req.headers.authorization?.split(" ")[1];
        // If no token found, log out gracefully
        if (!token) {
            return res.status(200).json({
                message: "User logged out (no active session).",
            });
        }
        // Verify token
        let decodedToken = null;
        try {
            decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            // Invalid token, clear cookies as a fallback
            res.clearCookie("token");
            req.logOut(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            return res.status(200).json({
                message: "User logged out (invalid token).",
            });
        }
        const members = await member_1.Members.find({
            user: decodedToken.id
        }).populate('user');
        return res.status(200).json({
            status: "success",
            data: members
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to fetch members", 400));
    }
};
exports.getAllMembers = getAllMembers;
// Get Member by ID
const getMemberById = async (req, res, next) => {
    try {
        const { id } = member_schemas_1.MemberIdSchema.parse({ id: req.params.id });
        const member = await member_1.Members.findById(id);
        if (!member) {
            return next((0, app_err_1.AppErr)("Member not found", 404));
        }
        return res.status(200).json({
            status: "success",
            data: member
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to fetch member", 400));
    }
};
exports.getMemberById = getMemberById;
// Update Member
const updateMember = async (req, res, next) => {
    try {
        const { id } = member_schemas_1.MemberIdSchema.parse({ id: req.params.id });
        const validatedData = member_schemas_1.UpdateMemberSchema.parse(req.body);
        const member = await member_1.Members.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true
        });
        if (!member) {
            return next((0, app_err_1.AppErr)("Member not found", 404));
        }
        return res.status(200).json({
            status: "success",
            data: member
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to update member", 400));
    }
};
exports.updateMember = updateMember;
// Delete Member
const deleteMember = async (req, res, next) => {
    try {
        const { id } = member_schemas_1.MemberIdSchema.parse({ id: req.params.id });
        const member = await member_1.Members.findByIdAndDelete(id);
        if (!member) {
            return next((0, app_err_1.AppErr)("Member not found", 404));
        }
        return res.status(200).json({
            status: "success",
            message: "Member deleted successfully"
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to delete member", 400));
    }
};
exports.deleteMember = deleteMember;
