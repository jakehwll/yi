import { z } from "zod";
import { t } from "../trpc";

export const challenge = t.router({
  get: t.procedure.query(({}) => {
    return "Hello world";
  }),
  check: t.procedure
    .input(
        z.object({
            
        })
    )
    .mutation(({}) => {
        return "Hello world";
    }),
});