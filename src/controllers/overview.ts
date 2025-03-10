import { NextFunction, Request, Response } from "express";
import { AppErrServer } from "../utils/app-err";
import jwt from 'jsonwebtoken';
import { Account } from '../models/account';
import { Budjets } from '../models/budjet';
import { Category } from '../models/category';
import { Members } from '../models/member';
import { Transaction } from '../models/transaction';
import { startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns'; // For date manipulation

export async function FetchAppOverview(req: Request, res: Response, next: NextFunction) {
  try {
    // Extract token from cookies or headers
    const token : string = req.cookies['token'] || req.headers.authorization?.split(" ")[1];
    
    // If no token found, log out gracefully
    if (!token) {
      return res.status(200).json({
        message: "User logged out successfully (no active session).",
        token
      });
    }

    // Verify token
    let decodedToken: any = null;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return res.status(200).json({
        message: "User logged out successfully (invalid token).",
        decodedToken
      });
    }

    const userId = decodedToken.id;

    // Time-based data
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());
    const thisMonthStart = startOfMonth(new Date());
    const thisMonthEnd = endOfMonth(new Date());
    const thisYearStart = startOfYear(new Date());
    const thisYearEnd = endOfYear(new Date());

    // Fetching time-based data for transactions, members, and categories
    const transactionsToday = await Transaction.find({
      memberId: userId,
      date: { $gte: todayStart, $lte: todayEnd },
    });
    const transactionsThisMonth = await Transaction.find({
      memberId: userId,
      date: { $gte: thisMonthStart, $lte: thisMonthEnd },
    });
    const transactionsThisYear = await Transaction.find({
      memberId: userId,
      date: { $gte: thisYearStart, $lte: thisYearEnd },
    });

    const membersToday = await Members.find({
      joinedDate: { $gte: todayStart, $lte: todayEnd },
    });
    const membersThisMonth = await Members.find({
      joinedDate: { $gte: thisMonthStart, $lte: thisMonthEnd },
    });
    const membersThisYear = await Members.find({
      joinedDate: { $gte: thisYearStart, $lte: thisYearEnd },
    });

    const categoriesThisMonth = await Category.find({
      createdAt: { $gte: thisMonthStart, $lte: thisMonthEnd },
      createdBy: userId,
    });

    // Fetch insights
    const accounts = await Account.find({ memberId: userId });
    const budgets = await Budjets.find({ memberId: userId });
    const categories = await Category.find({ createdBy: userId });
    const transactions = await Transaction.find({ memberId: userId });
    const memberProfile = await Members.findById(userId);

    // Prepare insights
    const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
    const totalBudget = budgets.reduce((acc: any, budget: any) => acc + budget.amount, 0);
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
  } catch (error) {
    return next(AppErrServer(error));
  }
}
