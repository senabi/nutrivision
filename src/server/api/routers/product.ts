import {  productSchema } from "~/lib/validators";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  create: publicProcedure.input(productSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.product.create({
      data: {
        name: input.name,
    barcode: input.barcode,
    category: input.category,
    carbohydrates: input.carbohydrates,
    fats: input.fats,
    proteins:input.proteins,
    vitamins: input.vitamins,
    minerals: input.minerals,
    dangerous_ingredients: input.dangerous_ingredients,
    allergens:input.allergens,
    serving_sizes:input.serving_sizes,
    danger_medical: input.danger_medical,
      },
    });
  }),
  readOne: publicProcedure.input(z.object({ barcode: z.string()})).query(({ ctx, input }) => {
    return ctx.prisma.product.findFirstOrThrow({where: {
      barcode: input.barcode
    }});
  }),
});
