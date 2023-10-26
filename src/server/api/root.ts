import { createTRPCRouter } from "~/server/api/trpc";
import { deck } from "./routers/deck";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  deck
});

// export type definition of API
export type AppRouter = typeof appRouter;
