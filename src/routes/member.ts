import express, { Request, Response, NextFunction } from 'express';
import {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from '../controllers/member';

const memberRouter = express.Router();

// Create a new member
memberRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createMember(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get all members
memberRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllMembers(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Get a member by ID
memberRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getMemberById(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Update a member by ID
memberRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateMember(req, res, next);
  } catch (error) {
    next(error);
  }
});

// Delete a member by ID
memberRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteMember(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default memberRouter;
