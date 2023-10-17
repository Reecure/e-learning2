import {procedure, router} from "@/server/trpc";
import {z} from "zod";
import {TRPCError} from "@trpc/server";

export const moduleRouter = router({
    byId: procedure.input(z.object({
        id: z.string().min(24).max(24)
    })).query(async ({ctx, input}) => {
        const module = await ctx.modules.findUnique({
            where: {
                id: input.id
            }
        });
        
        if (!module) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `No module with id '${input.id}'`,
            });
        }
        return module;
    }),
    byCourseId: procedure.input(z.object({
        id: z.string().min(24).max(24)
    })).query(async ({ctx, input}) => {
        const modules = await ctx.modules.findMany({
            where: {
                course_id: input.id
            }
        });

        if (!modules) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `No course with id '${input.id}'`,
            });
        }
        return modules;
    }),
    create: procedure.input(
        z.object({
            title: z.string(),
            course_id: z.string(),
            author_id: z.string(),
            is_visible: z.boolean(),
            order: z.number(),
        }),
    ).mutation(async ({ctx, input}) => {
        const createdModule = await ctx.modules.create({
            data: {
                title: input.title,
                author_id: input.author_id,
                course_id: input.course_id,
                is_visible: input.is_visible,
                lessons: [],
                order: input.order,
            },
        });
        const additionalMessage = "Module create success";
        return {
            module: createdModule,
            message: additionalMessage,
        };
    }),
    updateOrder: procedure.input(
        z.object({
            id: z.string(),
            order: z.number(),
        }),
    ).mutation(async ({ctx, input}) => ctx.modules.update({
        where: {
            id: input.id,
        },
        data: {
            order: input.order,
        },
    })),
    updateInfo: procedure.input(
        z.object({
            id: z.string(),
            title: z.string(),
        }),
    ).mutation(async ({ctx, input}) => ctx.modules.update({
        where: {
            id: input.id,
        },
        data: {
            title: input.title,
        },
    })),
    updateVisibility: procedure.input(
        z.object({
            id: z.string(),
            is_visible: z.boolean(),
        }),
    ).mutation(async ({ctx,input}) => ctx.modules.update({
        where: {
            id: input.id,
        },
        data: {
            is_visible: input.is_visible,
        },
    })),
    delete: procedure.input(
        z.object({
            id: z.string(),
        }),
    ).mutation(async ({ctx, input}) => {
        await ctx.modules.delete({
            where: {
                id: input.id,
            },
        });

        await ctx.lessons.deleteMany({
            where: {
                module_id: input.id,
            },
        });
    }),
});