"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAccount = exports.updateAccount = exports.getAccountById = exports.getAllAccounts = exports.createAccount = void 0;
const account_1 = require("../models/account");
const account_schemas_1 = require("../schemas/account-schemas");
const app_err_1 = require("../utils/app-err");
// Create Account
const createAccount = async (req, res, next) => {
    try {
        const validatedData = await account_schemas_1.CreateAccountSchema.safeParseAsync(req.body);
        if (!validatedData.success) {
            res.status(401).json({
                status: "Failed",
                message: "Invalid input credentials",
                error: validatedData.error
            });
        }
        ;
        const account = await account_1.Account.create(validatedData.data);
        return res.status(201).json({
            status: "success",
            data: account
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to create account", 400));
    }
};
exports.createAccount = createAccount;
// Get All Accounts
const getAllAccounts = async (req, res, next) => {
    try {
        const { memberId } = req.query;
        const accounts = await account_1.Account.find({
            memberId
        }).populate('memberId');
        return res.status(200).json({
            status: "success",
            data: accounts
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to fetch accounts", 400));
    }
};
exports.getAllAccounts = getAllAccounts;
// Get Account by ID
const getAccountById = async (req, res, next) => {
    try {
        const { id } = account_schemas_1.AccountIdSchema.parse({ id: req.params.id });
        const account = await account_1.Account.findById(id).populate('memberId');
        if (!account) {
            return next((0, app_err_1.AppErr)("Account not found", 404));
        }
        return res.status(200).json({
            status: "success",
            data: account
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to fetch account", 400));
    }
};
exports.getAccountById = getAccountById;
// Update Account
const updateAccount = async (req, res, next) => {
    try {
        const { id } = account_schemas_1.AccountIdSchema.parse({ id: req.params.id });
        const validatedData = account_schemas_1.UpdateAccountSchema.parse(req.body);
        const account = await account_1.Account.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true
        });
        if (!account) {
            return next((0, app_err_1.AppErr)("Account not found", 404));
        }
        return res.status(200).json({
            status: "success",
            data: account
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to update account", 400));
    }
};
exports.updateAccount = updateAccount;
// Delete Account
const deleteAccount = async (req, res, next) => {
    try {
        const { id } = account_schemas_1.AccountIdSchema.parse({ id: req.params.id });
        const account = await account_1.Account.findByIdAndDelete(id);
        if (!account) {
            return next((0, app_err_1.AppErr)("Account not found", 404));
        }
        return res.status(200).json({
            status: "success",
            message: "Account deleted successfully"
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErr)("Failed to delete account", 400));
    }
};
exports.deleteAccount = deleteAccount;
