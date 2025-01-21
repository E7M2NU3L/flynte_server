import { CreateTransactionSchema, UpdateTransactionSchema, TransactionIdSchema } from "../schemas/transaction-schemas";
import z from "zod";

export type CreateTransactionType = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransactionType = z.infer<typeof UpdateTransactionSchema>;
export type TransactionIdType = z.infer<typeof TransactionIdSchema>; 