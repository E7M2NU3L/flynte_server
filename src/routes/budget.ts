import express, { Request, Response, NextFunction } from 'express';
import {
  createBudget,
  getAllBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from '../controllers/budget';

const budgetRouter = express.Router();

// Create a new budget
budgetRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createBudget(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get all budgets
budgetRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllBudgets(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get a budget by ID
budgetRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getBudgetById(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Update a budget by ID
budgetRouter.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateBudget(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Delete a budget by ID
budgetRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteBudget(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default budgetRouter; 