"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.getTransactionById = exports.getAllTransactions = exports.createTransaction = void 0;
const transaction_1 = require("../models/transaction");
const transaction_schemas_1 = require("../schemas/transaction-schemas");
const app_err_1 = require("../utils/app-err");
// Create Transaction
const createTransaction = async (req, res, next) => {
    try {
        const validatedData = await transaction_schemas_1.CreateTransactionSchema.safeParseAsync(req.body);
        if (!validatedData.success) {
            res.status(401).json({
                error: validatedData.error,
                status: "Failed",
                message: "Invalid input credentials"
            });
        }
        ;
        const transaction = await transaction_1.Transaction.create(validatedData.data);
        console.log(transaction);
        if (!transaction) {
            return res.json(401).json({
                message: "Failed to create Transactions",
                status: "Failed"
            });
        }
        return res.status(201).json({
            status: "success",
            data: transaction
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to create transaction", 400));
    }
};
exports.createTransaction = createTransaction;
// Get All Transactions
const getAllTransactions = async (req, res, next) => {
    try {
        const { memberId } = req.query;
        const transactions = await transaction_1.Transaction.find({
            memberId
        })
            .populate('memberId')
            .populate('categoryId');
        return res.status(200).json({
            status: "success",
            data: transactions
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to fetch transactions", 400));
    }
};
exports.getAllTransactions = getAllTransactions;
// Get Transaction by ID
const getTransactionById = async (req, res, next) => {
    try {
        const { id } = transaction_schemas_1.TransactionIdSchema.parse({ id: req.params.id });
        const transaction = await transaction_1.Transaction.findById(id)
            .populate('memberId')
            .populate('categoryId');
        if (!transaction) {
            return next((0, app_err_1.AppErr)("Transaction not found", 404));
        }
        return res.status(200).json({
            status: "success",
            data: transaction
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to fetch transaction", 400));
    }
};
exports.getTransactionById = getTransactionById;
// Update Transaction
const updateTransaction = async (req, res, next) => {
    try {
        const { id } = transaction_schemas_1.TransactionIdSchema.parse({ id: req.params.id });
        const validatedData = transaction_schemas_1.UpdateTransactionSchema.parse(req.body);
        const transaction = await transaction_1.Transaction.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true
        });
        if (!transaction) {
            return next((0, app_err_1.AppErr)("Transaction not found", 404));
        }
        return res.status(200).json({
            status: "success",
            data: transaction
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to update transaction", 400));
    }
};
exports.updateTransaction = updateTransaction;
// Delete Transaction
const deleteTransaction = async (req, res, next) => {
    try {
        const { id } = transaction_schemas_1.TransactionIdSchema.parse({ id: req.params.id });
        const transaction = await transaction_1.Transaction.findByIdAndDelete(id);
        if (!transaction) {
            return next((0, app_err_1.AppErr)("Transaction not found", 404));
        }
        return res.status(200).json({
            status: "success",
            message: "Transaction deleted successfully"
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to delete transaction", 400));
    }
};
exports.deleteTransaction = deleteTransaction;
