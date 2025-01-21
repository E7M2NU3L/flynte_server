import express, { Request, Response, NextFunction } from 'express';
import { 
  createTransaction, 
  deleteTransaction, 
  getAllTransactions, 
  getTransactionById, 
  updateTransaction 
} from '../controllers/transaction';

export const transactionsRouter = express.Router();

// Create a new transaction
transactionsRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createTransaction(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get all transactions
transactionsRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllTransactions(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get a transaction by ID
transactionsRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getTransactionById(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Update a transaction by ID
transactionsRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateTransaction(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Delete a transaction by ID
transactionsRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteTransaction(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default transactionsRouter;
