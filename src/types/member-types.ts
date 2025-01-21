import { CreateMemberSchema, UpdateMemberSchema, MemberIdSchema } from "../schemas/member-schemas";
import z from "zod";

export type CreateMemberType = z.infer<typeof CreateMemberSchema>;
export type UpdateMemberType = z.infer<typeof UpdateMemberSchema>;
export type MemberIdType = z.infer<typeof MemberIdSchema>; 