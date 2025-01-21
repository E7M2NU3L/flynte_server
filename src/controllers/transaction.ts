import { Request, Response, NextFunction } from "express";
import { Transaction } from "../models/transaction";
import { CreateTransactionSchema, TransactionIdSchema, UpdateTransactionSchema } from "../schemas/transaction-schemas";
import { AppErr } from "../utils/app-err";

// Create Transaction
export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = await CreateTransactionSchema.safeParseAsync(req.body);
        if (!validatedData.success) {
            res.status(401).json({
                error : validatedData.error,
                status: "Failed",
                message: "Invalid input credentials"
            })
        };

        const transaction = await Transaction.create(validatedData.data);
        console.log(transaction);
        if (!transaction) {
            return res.json(401).json({
                message: "Failed to create Transactions",
                status: "Failed"
            })
        }

        return res.status(201).json({
            status: "success",
            data: transaction
        });
    } catch (error) {
        return next(AppErr("Failed to create transaction", 400));
    }
};

// Get All Transactions
export const getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {memberId} = req.query;
        const transactions = await Transaction.find({
            memberId
        })
            .populate('memberId')
            .populate('categoryId');
        
        return res.status(200).json({
            status: "success",
            data: transactions
        });
    } catch (error) {
        return next(AppErr("Failed to fetch transactions", 400));
    }
};

// Get Transaction by ID
export const getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = TransactionIdSchema.parse({ id: req.params.id });
        const transaction = await Transaction.findById(id)
            .populate('memberId')
            .populate('categoryId');
        
        if (!transaction) {
            return next(AppErr("Transaction not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            data: transaction
        });
    } catch (error) {
        return next(AppErr("Failed to fetch transaction", 400));
    }
};

// Update Transaction
export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = TransactionIdSchema.parse({ id: req.params.id });
        const validatedData = UpdateTransactionSchema.parse(req.body);
        
        const transaction = await Transaction.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true
        });
        
        if (!transaction) {
            return next(AppErr("Transaction not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            data: transaction
        });
    } catch (error) {
        return next(AppErr("Failed to update transaction", 400));
    }
};

// Delete Transaction
export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = TransactionIdSchema.parse({ id: req.params.id });
        const transaction = await Transaction.findByIdAndDelete(id);
        
        if (!transaction) {
            return next(AppErr("Transaction not found", 404));
        }
        
        return res.status(200).json({
            status: "success",
            message: "Transaction deleted successfully"
        });
    } catch (error) {
        return next(AppErr("Failed to delete transaction", 400));
    }
};
