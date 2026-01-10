import prisma from "@/lib/prisma";
import { createTRPCRouter, protectedProcedure } from "../init";
import { inngest } from "@/inngest/client";
import { TRPCError } from "@trpc/server";

export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    // throw new TRPCError({
    //   code: "BAD_REQUEST",
    //   message: "Something went wrong",
    // });

    await inngest.send({ name: "execute/ai" });

    return { success: true, message: "Job queued" };
  }),
  getWorkflow: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkflow: protectedProcedure.mutation(async () => {
    await inngest.send({
      name: "test/hello.world",
      data: { email: "a@a.com" },
    });

    return { success: true, message: "Job queued" };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
