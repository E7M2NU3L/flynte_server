import { CreateCategorySchema, UpdateCategorySchema, CategoryIdSchema } from "../schemas/category-schemas";
import z from "zod";

export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>;
export type CategoryIdType = z.infer<typeof CategoryIdSchema>; 