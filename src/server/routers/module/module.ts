import {procedure, router} from "@/server/trpc";
import {z} from "zod";
import {TRPCError} from "@trpc/server";

export const moduleRouter = router({
    moduleById: procedure.input(z.object({
        id: z.string().min(24).max(24)
    })).query(async ({ctx, input}) => {
        const course = await ctx.modules.findUnique({
            where: {
                id: input.id
            }
        });
        
        if (!course) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `No course with id '${input.id}'`,
            });
        }
        return course;
    }),
});