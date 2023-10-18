import { createTRPCRouter } from "~/server/api/trpc";
import { authentication } from "./routers/auth";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authentication,
});

// export type definition of API
export type AppRouter = typeof appRouter;
