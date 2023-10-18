import { z } from "zod";
import { t } from "../trpc";
import { auth } from "~/auth/lucia";
import { TRPCError } from "@trpc/server";
import * as context from "next/headers";

export const authentication = t.router({
  get: t.procedure
    .query(async ({ ctx: { method } }) => {
      const authRequest = auth.handleRequest(method, context);
      const session = await authRequest.validate();

      console.log(authRequest)

      if ( !session ) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      return {
        authenticated: true,
        user: {
          username: session.user.username,
          id: session.user.userId,
        },
      }
    }),
  signin: t.procedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .output(
      z.object({
        success: z.boolean(),
        user: z.object({ username: z.string(), id: z.string() }),
      }),
    )
    .mutation(async ({ ctx: { method }, input: { username, password } }) => {
      try {
        const key = await auth.useKey(
          "username",
          username.toLowerCase(),
          password,
        );
        const session = await auth.createSession({
          userId: key.userId,
          attributes: {},
        });
        const authRequest = auth.handleRequest(method, context);
        authRequest.setSession(session);
        const { username: user_name, userId } = session.user;
        return { success: true, user: { username: user_name, id: userId } };
      } catch (e) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
    }),
  signup: t.procedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(({ input: { username, password } }) => {
      return "Hello world";
    }),
  signout: t.procedure
    .output(z.object({ success: z.boolean() }))
    .mutation(async ({ ctx: { method } }) => {
      const authRequest = auth.handleRequest(method, context);
      const session = await authRequest.validate();

      if (!session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      await auth.invalidateSession(session.sessionId);
      authRequest.setSession(null);

      return {
        success: true,
      };
    }),
});