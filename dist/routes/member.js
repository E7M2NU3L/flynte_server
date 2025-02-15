"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const member_1 = require("../controllers/member");
const memberRouter = express_1.default.Router();
// Create a new member
memberRouter.post('/', async (req, res, next) => {
    try {
        await (0, member_1.createMember)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Get all members
memberRouter.get('/', async (req, res, next) => {
    try {
        await (0, member_1.getAllMembers)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Get a member by ID
memberRouter.get('/:id', async (req, res, next) => {
    try {
        await (0, member_1.getMemberById)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Update a member by ID
memberRouter.put('/:id', async (req, res, next) => {
    try {
        await (0, member_1.updateMember)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
// Delete a member by ID
memberRouter.delete('/:id', async (req, res, next) => {
    try {
        await (0, member_1.deleteMember)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
exports.default = memberRouter;
