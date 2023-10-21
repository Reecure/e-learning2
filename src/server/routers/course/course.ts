import {procedure, router} from "@/server/trpc";
import {z} from "zod";
import {TRPCError} from "@trpc/server";

export const courseRouter = router({
    courseById: procedure.input(z.object({
        id: z.string().min(24).max(24)
    })).query(async ({ctx, input}) => {
        const course = await ctx.course.findUnique({
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
    allVisible: procedure.query(async ({ctx, input}) => {
        const course = await ctx.course.findMany({
            where: {
                is_visible: true
            }
        });

        if (!course) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "No courses",
            });
        }
        return course;
    }),
    createCourse: procedure.input(
        z.object({
            cover_image: z.string(),
            title: z.string(),
            description: z.string(),
            cover_description: z.string(),
            rating: z.number(),
            creation_date: z.string(),
            isVisible: z.boolean(),
            author_id: z.string(),
            category_id: z.string(),
            difficulty_level: z.string(),
            duration: z.string(),
        }),
    ).mutation(async ({ctx, input}) => {
        const course = await ctx.course.create({
            data: {
                cover_image: input.cover_image,
                title: input.title,
                description: input.description,
                cover_description: input.cover_description,
                rating: input.rating,
                creation_date: input.creation_date,
                is_visible: input.isVisible,
                modules: [],
                author_id: input.author_id,
                category_id: input.category_id,
                difficulty_level: input.difficulty_level,
                duration: input.duration,
            },
        });
        return course;
    }),
    updateCourse: procedure.input(
        z.object({
            id: z.string(),
            cover_image: z.string(),
            title: z.string(),
            description: z.string(),
            cover_description: z.string(),
            isVisible: z.boolean(),
            difficulty_level: z.string(),
            duration: z.string(),
        }),
    ).mutation(async ({ctx, input}) => {
        const course = await ctx.course.update({
            where: {
                id: input.id,
            },
            data: {
                cover_image: input.cover_image,
                title: input.title,
                description: input.description,
                cover_description: input.cover_description,
                is_visible: input.isVisible,
                difficulty_level: input.difficulty_level,
                duration: input.duration,
            },
        });
        return course;
    }),
    deleteCourse: procedure.input(
        z.object({
            id: z.string(),
        }),
    ).mutation(async ({ctx, input}) => {
        const modulesIds = await ctx.modules.findMany({
            where: {
                course_id: input.id,
            },
        });

        modulesIds.map(async item => {
            await ctx.lessons.deleteMany({
                where: {
                    module_id: item.id,
                },
            });
        });

        await ctx.modules.deleteMany({
            where: {
                course_id: input.id,
            },
        });

        await ctx.course.delete({
            where: {
                id: input.id,
            },
        });
    }),
});