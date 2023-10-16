import {procedure, router} from "@/server/trpc";
import {z} from "zod";
import {TRPCError} from "@trpc/server";

export const lessonRouter = router({
    courseById: procedure.input(z.object({
        id: z.string().min(24).max(24)
    })).query(async ({ctx, input}) => {
        const lesson = await ctx.lessons.findUnique({
            where: {
                id: input.id
            }
        });
        if (!lesson) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `No lesson with id '${input.id}'`,
            });
        }
        return lesson;
    }),
});