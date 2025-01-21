import { Request, Response, NextFunction } from "express";
import { Account } from "../models/account";
import { CreateAccountSchema, AccountIdSchema, UpdateAccountSchema } from "../schemas/account-schemas";
import { AppErr } from "../utils/app-err";

// Create Account
export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = await CreateAccountSchema.safeParseAsync(req.body);
        if (!validatedData.success) {
            res.status(401).json({
                status : "Failed",
                message: "Invalid input credentials",
                error: validatedData.error
            });
        };

        const account = await Account.create(validatedData.data);
        
        return res.status(201).json({
            status: "success",
            data: account
        });
    } catch (error) {
        return next(AppErr("Failed to create account", 400));
    }
};

// Get All Accounts
export const getAllAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {memberId} = req.query;
        const accounts = await Account.find({
            memberId
        }).populate('memberId');
        
        return res.status(200).json({
            status: "success",
            data: accounts
        });
    } catch (error) {
        return next(AppErr("Failed to fetch accounts", 400));
    }
};

// Get Account by ID
export const getAccountById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = AccountIdSchema.parse({ id: req.params.id });
        const account = await Account.findById(id).populate('memberId');
        
        if (!account) {
            return next(AppErr("Account not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            data: account
        });
    } catch (error) {
        return next(AppErr("Failed to fetch account", 400));
    }
};

// Update Account
export const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = AccountIdSchema.parse({ id: req.params.id });
        const validatedData = UpdateAccountSchema.parse(req.body);
        
        const account = await Account.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true
        });
        
        if (!account) {
            return next(AppErr("Account not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            data: account
        });
    } catch (error) {
        return next(AppErr("Failed to update account", 400));
    }
};

// Delete Account
export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = AccountIdSchema.parse({ id: req.params.id });
        const account = await Account.findByIdAndDelete(id);
        
        if (!account) {
            return next(AppErr("Account not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            message: "Account deleted successfully"
        });
    } catch (error) {
        return next(AppErr("Failed to delete account", 400));
    }
};
