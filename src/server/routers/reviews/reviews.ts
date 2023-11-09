import {procedure, router} from "@/server/trpc";
import {z} from "zod";

export const reviewsRouter = router({
    getAll: procedure.input(
        z.object({
            course_id: z.string(),
        })).query(async ({ctx, input}) => {
        const reviews = await ctx.reviews.findUnique({
            where: {
                course_id: input.course_id
            }
        });
        if (reviews === null) {
            throw new Error("user not found");
        }

        return reviews;
    })
});