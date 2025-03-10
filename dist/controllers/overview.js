"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAppOverview = FetchAppOverview;
const app_err_1 = require("../utils/app-err");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_1 = require("../models/account");
const budjet_1 = require("../models/budjet");
const category_1 = require("../models/category");
const member_1 = require("../models/member");
const transaction_1 = require("../models/transaction");
const date_fns_1 = require("date-fns"); // For date manipulation
async function FetchAppOverview(req, res, next) {
    try {
        // Extract token from cookies or headers
        const token = req.cookies['token'] || req.headers.authorization?.split(" ")[1];
        // If no token found, log out gracefully
        if (!token) {
            return res.status(200).json({
                message: "User logged out successfully (no active session).",
                token
            });
        }
        // Verify token
        let decodedToken = null;
        try {
            decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (error) {
            return res.status(200).json({
                message: "User logged out successfully (invalid token).",
                decodedToken
            });
        }
        const userId = decodedToken.id;
        // Time-based data
        const todayStart = (0, date_fns_1.startOfDay)(new Date());
        const todayEnd = (0, date_fns_1.endOfDay)(new Date());
        const thisMonthStart = (0, date_fns_1.startOfMonth)(new Date());
        const thisMonthEnd = (0, date_fns_1.endOfMonth)(new Date());
        const thisYearStart = (0, date_fns_1.startOfYear)(new Date());
        const thisYearEnd = (0, date_fns_1.endOfYear)(new Date());
        // Fetching time-based data for transactions, members, and categories
        const transactionsToday = await transaction_1.Transaction.find({
            memberId: userId,
            date: { $gte: todayStart, $lte: todayEnd },
        });
        const transactionsThisMonth = await transaction_1.Transaction.find({
            memberId: userId,
            date: { $gte: thisMonthStart, $lte: thisMonthEnd },
        });
        const transactionsThisYear = await transaction_1.Transaction.find({
            memberId: userId,
            date: { $gte: thisYearStart, $lte: thisYearEnd },
        });
        const membersToday = await member_1.Members.find({
            joinedDate: { $gte: todayStart, $lte: todayEnd },
        });
        const membersThisMonth = await member_1.Members.find({
            joinedDate: { $gte: thisMonthStart, $lte: thisMonthEnd },
        });
        const membersThisYear = await member_1.Members.find({
            joinedDate: { $gte: thisYearStart, $lte: thisYearEnd },
        });
        const categoriesThisMonth = await category_1.Category.find({
            createdAt: { $gte: thisMonthStart, $lte: thisMonthEnd },
            createdBy: userId,
        });
        // Fetch insights
        const accounts = await account_1.Account.find({ memberId: userId });
        const budgets = await budjet_1.Budjets.find({ memberId: userId });
        const categories = await category_1.Category.find({ createdBy: userId });
        const transactions = await transaction_1.Transaction.find({ memberId: userId });
        const memberProfile = await member_1.Members.findById(userId);
        // Prepare insights
        const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
        const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
        const totalSpent = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        // Return data with time-based graphical insights
        return res.json({
            status: "Success",
            message: "The Overview data has been fetched successfully",
            data: {
                totalBalance,
                totalBudget,
                totalSpent,
                totalTransactions: transactions.length,
                totalTransactionsToday: transactionsToday.length,
                totalTransactionsThisMonth: transactionsThisMonth.length,
                totalTransactionsThisYear: transactionsThisYear.length,
                totalMembers: membersThisMonth.length, // Members joined this month
                totalCategoriesThisMonth: categoriesThisMonth.length,
                categories,
                memberProfile,
                transactions,
                timeBasedInsights: {
                    transactionsToday,
                    transactionsThisMonth,
                    transactionsThisYear,
                    membersToday,
                    membersThisMonth,
                    membersThisYear,
                    categoriesThisMonth
                }
            },
        });
    }
    catch (error) {
        return next((0, app_err_1.AppErrServer)(error));
    }
}
