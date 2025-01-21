import express, { Request, Response, NextFunction } from 'express';
import {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} from '../controllers/account';

const accountRouter = express.Router();

// Create a new account
accountRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createAccount(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get all accounts
accountRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllAccounts(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get an account by ID
accountRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAccountById(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Update an account by ID
accountRouter.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateAccount(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Delete an account by ID
accountRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteAccount(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default accountRouter;