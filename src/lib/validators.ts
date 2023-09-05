import { z } from "zod";

export const familyMemberSchema = z.object({
    goals: z.string(),
    name: z.string(),
    diseases: z.string(),
});
export type FamilyMemberSchema = z.infer<typeof familyMemberSchema>;
