import {procedure, router} from "@/server/trpc";
import {z} from "zod";
import {TRPCError} from "@trpc/server";
import {LessonType} from "@/enteties/Lesson";
import {ObjectId} from "bson";

export const lessonRouter = router({
    byId: procedure.input(z.object({
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
    byModuleId: procedure.input(z.object({
        id: z.string().min(24).max(24)
    })).query(async ({ctx, input}) => {
        const lessons = await ctx.lessons.findMany({
            where: {
                module_id: input.id
            }
        });
        if (!lessons) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `No lesson with id '${input.id}'`,
            });
        }
        return lessons;
    }),
    create: procedure.input(
        z.object({
            title: z.string(),
            lesson_type: z.nativeEnum(LessonType),
            order: z.number(),
            module_id: z.string(),
            is_visible: z.boolean(),
            author_id: z.string().min(1),
            lesson_content: z.object({
                blocks: z.array(z.any())
            })
        })
    ).mutation(async ({ctx, input}) => {

        const LESSON_ID = new ObjectId().toHexString();

        const custom_lesson = {
            id: new ObjectId().toHexString(),
            lesson_id: LESSON_ID,
            is_visible: input.is_visible,
            title: input.title,
            lesson_type: input.lesson_type,
            order: input.order,
            author_id: input.author_id,
        };

        await ctx.modules.update({
            where: {
                id: input.module_id
            },
            data: {
                lessons: {
                    push: custom_lesson
                }
            }
        });

        await ctx.lessons.create({
            data: {
                id: LESSON_ID,
                title: input.title,
                lesson_type: input.lesson_type,
                order: input.order,
                author_id: input.author_id,
                module_id: input.module_id,
                lesson_content: input.lesson_content
            },
        });
    }),
    updateInfo: procedure.input(
        z.object({
            id: z.string(),
            title: z.string(),
            module_id: z.string(),
            lesson_type: z.string(),
            lesson_content: z.object({
                blocks: z.array(z.any()),
            }),
        }),
    ).mutation(async ({ctx,input}) => {
        const lesson_tp = await ctx.lessons.findUnique({
            where: {
                id: input.id,
            },
        });
        const moduleLessons = await ctx.modules.findUnique(({
            where: {
                id: input.module_id
            }
        }));
        if (input.lesson_type === lesson_tp?.lesson_type) {
            await ctx.lessons.update({
                where: {
                    id: input.id,
                },
                data: {
                    title: input.title,
                    lesson_type: input.lesson_type,
                },
            });
        }
        if (moduleLessons === null) {
            throw new Error();
        }
        const newLessons = [...moduleLessons.lessons].map(lesson => {
            if (lesson.lesson_id === input.id){
                return {
                    ...lesson,
                    title: input.title,
                    lesson_type: input.lesson_type,
                };
            }
            return lesson;
        });

        await ctx.modules.update({
            where: {
                id: input.module_id,
            },
            data: {
                lessons: newLessons
            },
        });

        await ctx.lessons.update({
            where: {
                id: input.id,
            },
            data: {
                title: input.title,
                lesson_type: input.lesson_type,
                lesson_content: {
                    blocks: [],
                },
            },
        });

        return newLessons;
    }),
    updateContent: procedure.input(
        z.object({
            id: z.string(),
            lesson_content: z.object({
                blocks: z.array(z.any())
            })
        }
        )).mutation(async ({ctx, input}) => ctx.lessons.update({
        where: {
            id: input.id,
        },
        data: {
            lesson_content: input.lesson_content,
        },
    })),
    updateOrder: procedure.input(
        z.object({
            id: z.string(),
            lessons: z.any(),
        }),
    ).mutation(async ({ctx, input}) => {
        await ctx.modules.update({
            where: {
                id: input.id
            },
            data: {
                lessons: input.lessons
            }
        });
    }),
    updateVisibility: procedure.input(
        z.object({
            module_id: z.string(),
            id: z.string(),
            is_visible: z.boolean(),
        }),
    ).mutation(async ({ctx, input}) => {
        await ctx.modules.update({
            where: {
                id: input.module_id,
            },
            data: {
                lessons: {
                    updateMany: {
                        where: {
                            id: input.id
                        },
                        data: {
                            is_visible: input.is_visible
                        }
                    }
                },
            },
        });
    }),
    delete: procedure.input(
        z.object({
            id: z.string(),
            module_id: z.string()
        }),
    ).mutation(async ({ctx, input}) => {
        const module = await ctx.modules.findUnique({
            where: {
                id: input.module_id,
            },
        });

        if (module !== null) {
            const moduleLessonsUpdate = [...module.lessons].filter(lesson => lesson.lesson_id !== input.id);

            await ctx.modules.update({
                where: {
                    id: input.module_id
                },
                data: {
                    lessons: moduleLessonsUpdate
                }
            });
            await ctx.lessons.delete({
                where: {
                    id: input.id,
                },
            });
        } else {
            throw new Error("Server error");
        }

    }),
});