import {procedure, router} from "@/server/trpc";
import {z} from "zod";

export const reviewsRouter = router({
    getAll: procedure.input(
        z.object({
            course_id: z.string(),
        })).query(async ({ctx, input}) => {
        const reviews = await ctx.reviews.findMany({
            where: {
                course_id: input.course_id
            }
        });
        if (reviews === null) {
            throw new Error("reviews not found");
        }

        return reviews;
    }),
    create: procedure.input(
        z.object({
            course_id: z.string(),
            user_id: z.string(),
            text: z.string(),
        })).mutation(async ({ctx, input}) => {

        return ctx.reviews.create({
            data: {
                course_id: input.course_id,
                user_id: input.user_id,
                creation_date: new Date().toISOString(),
                text: input.text,
            }
        });
    })
});