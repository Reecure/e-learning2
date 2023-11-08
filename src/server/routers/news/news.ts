import {procedure, router} from "@/server/trpc";
import {z} from "zod";

export const newsRouter = router({

    getNews: procedure.query(async ({ctx, input}) => {
        return ctx.news.findMany();
    }),
    addNews: procedure.input(
        z.object({
            author_id: z.string(),
            title: z.string(),
            description: z.string(),
            creation_date: z.string(),
        })
    ).mutation(async ({ctx, input}) => {
        return ctx.news.create({
            data: {
                author_id: input.author_id,
                title: input.title,
                description: input.description,
                creation_date: input.creation_date
            }
        });
    }),
});