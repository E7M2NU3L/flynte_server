import { Request, Response, NextFunction } from "express";
import { Members } from "../models/member";
import { CreateMemberSchema, MemberIdSchema, UpdateMemberSchema } from "../schemas/member-schemas";
import { AppErr } from "../utils/app-err";
import jwt from 'jsonwebtoken';

// Create Member
export const createMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract token from cookies or headers
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
            
        // If no token found, log out gracefully
        if (!token) {
            return res.status(200).json({
                message: "User logged out (no active session).",
            });
        }

        // Verify token
        let decodedToken : any = null;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (error) {
            // Invalid token, clear cookies as a fallback
            res.clearCookie("token");
            req.logOut(function(err) {
                if (err) {
                    console.log(err);
                }
            });
            return res.status(200).json({
                message: "User logged out (invalid token).",
            });
        }

        const validatedData = await CreateMemberSchema.safeParseAsync(req.body);
        if (!validatedData.success) {
            res.status(404).json({
                status : "Failed",
                message : "Invalid Input credentials",
                validatedData
            })
        }

        const payload = {
            ...validatedData.data,
            user: decodedToken.id
        }
        const member = await Members.create(payload);
        if (!member) {
            res.status(301).json({
                status : "Failed",
                message : "Member not created, Unique data must be given",
            })
        }
        return res.status(201).json({
            status: "success",
            data: member
        });
    } catch (error) {
        return next(AppErr("Failed to create member", 400));
    }
};

// Get All Members
export const getAllMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract token from cookies or headers
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
            
        // If no token found, log out gracefully
        if (!token) {
            return res.status(200).json({
                message: "User logged out (no active session).",
            });
        }

        // Verify token
        let decodedToken : any = null;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        } catch (error) {
            // Invalid token, clear cookies as a fallback
            res.clearCookie("token");
            req.logOut(function(err) {
                if (err) {
                    console.log(err);
                }
            });
            return res.status(200).json({
                message: "User logged out (invalid token).",
            });
        }
        const members = await Members.find({
            user: decodedToken.id
        }).populate('user');
        
        return res.status(200).json({
            status: "success",
            data: members
        });
    } catch (error) {
        return next(AppErr("Failed to fetch members", 400));
    }
};

// Get Member by ID
export const getMemberById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = MemberIdSchema.parse({ id: req.params.id });
        const member = await Members.findById(id);
        
        if (!member) {
            return next(AppErr("Member not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            data: member
        });
    } catch (error) {
        return next(AppErr("Failed to fetch member", 400));
    }
};

// Update Member
export const updateMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = MemberIdSchema.parse({ id: req.params.id });
        const validatedData = UpdateMemberSchema.parse(req.body);
        
        const member = await Members.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true
        });
        
        if (!member) {
            return next(AppErr("Member not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            data: member
        });
    } catch (error) {
        return next(AppErr("Failed to update member", 400));
    }
};

// Delete Member
export const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = MemberIdSchema.parse({ id: req.params.id });
        const member = await Members.findByIdAndDelete(id);
        
        if (!member) {
            return next(AppErr("Member not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            message: "Member deleted successfully"
        });
    } catch (error) {
        return next(AppErr("Failed to delete member", 400));
    }
};