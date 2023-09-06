import { z } from "zod";

export const familyMemberSchema = z.object({
    goals: z.string(),
    name: z.string(),
    diseases: z.string(),
});
export type FamilyMemberSchema = z.infer<typeof familyMemberSchema>;

export const productSchema = z.object({
    name: z.string(),
    barcode: z.string(),
    category: z.string(),
    carbohydrates: z.string(),
    fats: z.string(),
    proteins: z.string(),
    vitamins: z.string(),
    minerals: z.string(),
    dangerous_ingredients: z.string(),
    allergens: z.string(),
    serving_sizes: z.string(),
    danger_medical: z.string(),
  });