import {procedure, router} from "@/server/trpc";
import {z} from "zod";
import {TRPCError} from "@trpc/server";

export const progressRouter = router({
    getUserCoursesProgress: procedure.input(
        z.object({
            user_id: z.string(),
        })).query(async ({ctx, input}) => {
        const user = await ctx.user.findUnique({
            where: {
                id: input.user_id
            }
        });
        if (user === null) {
            throw new Error("user not found");
        }

        return user.courses_progress;
    }),
    getUserProgressOnCourse: procedure.input(z.object({
        user_id: z.string(),
        course_id: z.string()
    })).query(async ({ctx, input}) => {

        const userForProgress = await ctx.user.findUnique({
            where: {
                id: input.user_id
            }
        });
        if (userForProgress === null) {
            throw new Error("user not found");
        }
        const courseProgress = userForProgress.courses_progress.findIndex(item => item.course_id === input.course_id
        );

        if (courseProgress === -1) {
            throw new Error("User have not course");
        }

        const modulesOfCourseByCourseId = await ctx.modules.findMany({
            where: {
                course_id: input.course_id
            }
        });

        const modulesIds = modulesOfCourseByCourseId.map(items => items.id);

        const modulesProgress = userForProgress.modules_progress.filter(module => modulesIds.includes(module.module_id));

        const lessonsByModulesIds = await ctx.lessons.findMany({
            where: {
                id: {
                    in: modulesIds
                }
            }
        });

        const lessonsProgress = userForProgress.lessons_progress.filter(lesson => modulesIds.includes(lesson.module_id));

        const TOTAL_LESSONS = lessonsByModulesIds.length;

        return {
            lessonsProgress: {lessonsProgress},
            modulesProgress: {modulesProgress},
            courseProgress: {userProgress: userForProgress.courses_progress[courseProgress]},
            totalLessons: {TOTAL_LESSONS}
        };
    }),
    getLast7DaysLesson: procedure.input(z.object({
        id: z.string()
    })).query(async ({ctx, input}) => {
        const user = await ctx.user.findUnique({
            where: {
                id: input.id,
            },
            select: {
                lessons_progress: true,
            },
        });

        if (user !== null) {
            const currentDate = new Date();

            // Создаем массив для последних 7 дней с начальными значениями 0
            const lessonsByDay = Array.from({ length: 7 }, (_, index) => ({
                date: new Date(currentDate.getTime() - index * 24 * 60 * 60 * 1000),
                lessonCount: 0,
            }));

            // Заполняем массив данными из lessons_progress
            user.lessons_progress.forEach(lesson => {
                const lessonDate = new Date(lesson.complete_date);
                const daysDiff = Math.floor((currentDate.getTime() - lessonDate.getTime()) / (24 * 60 * 60 * 1000));

                if (daysDiff < 7) {
                    // Находим соответствующий день в массиве и увеличиваем значение lessonCount
                    const dayIndex = 6 - daysDiff;
                    lessonsByDay[dayIndex].lessonCount += 1;
                }
            });

            return lessonsByDay.reverse();
        } else {
            throw new TRPCError({ message: "user doesnt exist", code: "NOT_FOUND" });
        }
    }),
    getCompleteCount: procedure.input(z.object({
        id: z.string()
    })).query(async ({ctx, input}) => {
        const user = await ctx.user.findUnique({
            where: {
                id: input.id,
            },
            select: {
                courses_progress: true,
                lessons_progress: true,
                modules_progress: true
            },
        });

        if (user !== null) {
            return {
                courses_progress_length: user.courses_progress.length,
                modules_progress_length: user.modules_progress.length,
                lessons_progress_length: user.lessons_progress.length,
            };
        } else {
            throw new TRPCError({ message: "user doesnt exist", code: "NOT_FOUND" });
        }
    }),
    updateUserCourseProgress: procedure.input(z.object({
        id: z.string(),
        course_progress: z.object({
            course_id: z.string(),
            course_name: z.string(),
            is_completed: z.boolean(),
        }),
    }),
    ).mutation(async ({ctx, input}) => {
        const user = await ctx.user.findUnique({
            where: {
                id: input.id,
            },
        });

        const existingProgressIndex = user?.courses_progress.findIndex(
            item => item?.course_id === input.course_progress.course_id,
        );

        if (existingProgressIndex !== -1) {
            return 0;
        }

        return ctx.user.update({
            where: {
                id: input.id,
            },
            data: {
                courses_progress: {
                    push: input.course_progress,
                },
            },
        });
    }),
    updateUserModulesProgress: procedure.input(z.object({
        id: z.string(),
        module_progress: z.object({
            module_name: z.string(),
            module_id: z.string(),
            course_id: z.string(),
            is_completed: z.boolean(),
        }),
    }),
    ).mutation(async ({ctx, input}) => {
        const user = await ctx.user.findUnique({
            where: {
                id: input.id,
            },
        });

        const existingProgressIndex = user?.modules_progress.findIndex(
            item => item?.module_id === input.module_progress.module_id,
        );

        if (existingProgressIndex !== -1) {
            return 0;
        }

        return ctx.user.update({
            where: {
                id: input.id,
            },
            data: {
                modules_progress: {
                    push: input.module_progress,
                },
            },
        });
    }),
    updateUserLessonsProgress: procedure.input(z.object({
        id: z.string(),
        lesson_progress: z.object({
            lesson_name: z.string(),
            module_id: z.string(),
            complete_date: z.date(),
            lesson_id: z.string(),
            lessonType: z.string(),
            quizScore: z.number(),
            is_completed: z.boolean(),
        }),
    }),
    ).mutation(async ({ctx, input}) => {
        const {id, lesson_progress} = input;

        const user = await ctx.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            return null;
        }

        const existingProgressIndex = user.lessons_progress.findIndex(
            item => item?.lesson_id === lesson_progress.lesson_id,
        );

        if (existingProgressIndex !== -1) {
            user.lessons_progress[existingProgressIndex] = lesson_progress;
        } else {
            user.lessons_progress.push(lesson_progress);
        }

        const updatedUserLessonProgress = await ctx.user.update({
            where: {
                id,
            },
            data: {
                lessons_progress: user.lessons_progress,
            },
        });

        return updatedUserLessonProgress;
    }),
    getUserLessonsProgressById: procedure.input(z.object({
        id: z.string(),
        lesson_id: z.string(),
    }),
    ).query(async ({ctx, input}) => {
        const {id, lesson_id} = input;

        const user = await ctx.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            return null;
        }

        const existingProgressIndex = user.lessons_progress.findIndex(
            item => item?.lesson_id === lesson_id,
        );

        if (existingProgressIndex === -1) {
            return null;
        }

        return user.lessons_progress[existingProgressIndex];
    }),


});