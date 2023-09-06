import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { familyMemberRouter } from "./routers/familyMember";
import { productRouter } from "./routers/product";
import { openaiRouter } from "./routers/openai";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  familyMember: familyMemberRouter,
  product: productRouter,
  openai: openaiRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
