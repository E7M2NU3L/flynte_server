import { CreateAccountSchema, UpdateAccountSchema, AccountIdSchema } from "../schemas/account-schemas";
import z from "zod";

export type CreateAccountType = z.infer<typeof CreateAccountSchema>;
export type UpdateAccountType = z.infer<typeof UpdateAccountSchema>;
export type AccountIdType = z.infer<typeof AccountIdSchema>; 