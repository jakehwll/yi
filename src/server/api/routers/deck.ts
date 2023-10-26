import { z } from "zod";
import { t } from "../trpc";
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const prisma = new PrismaClient()

export const deck = t.router({
  getChallenges: t.procedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ input: { id } }) => {
      const deck = await prisma.deck.findFirst({
        where: {
          id: id
        },
        include: {
          DecksChallenge: {
            include: {
              challenge: true
            }
          }
        }
      })

      if ( !deck ) throw new TRPCError({ code: "NOT_FOUND", message: "Deck not found" })

      return {
        challenges: deck.DecksChallenge.map( dc => dc.challenge )
      }
    }),
});