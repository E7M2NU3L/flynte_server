import express, { Request, Response, NextFunction } from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/category';

const categoryRouter = express.Router();

// Create a new category
categoryRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createCategory(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get all categories
categoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllCategories(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get a category by ID
categoryRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getCategoryById(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Update a category by ID
categoryRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateCategory(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Delete a category by ID
categoryRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteCategory(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default categoryRouter;