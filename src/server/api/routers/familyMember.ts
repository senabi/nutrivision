import { familyMemberSchema } from "~/lib/validators";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const familyMemberRouter = createTRPCRouter({
  create: publicProcedure.input(familyMemberSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.familyMember.create({
      data: {
        name: input.name,
        goals: input.goals,
        diseases: input.diseases,
      },
    });
  }),
  readAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.familyMember.findMany();
  }),
});
