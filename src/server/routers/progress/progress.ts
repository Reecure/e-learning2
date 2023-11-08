import {procedure, router} from "@/server/trpc";
import {z} from "zod";
import {TRPCError} from "@trpc/server";
import {LessonType} from "@/enteties/Lesson";

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

        const modulesProgress = userForProgress.modules_progress.filter(module => module.course_id === input.course_id);

        const lessonsByModulesIds = await ctx.lessons.findMany({
            where: {
                id: {
                    in: modulesIds
                }
            }
        });

        const lessonsProgress = userForProgress.lessons_progress.filter(lesson => modulesIds.includes(lesson.module_id));

        const TOTAL_LESSONS = lessonsByModulesIds.length;

        const AVG_SCORE_QUIZ = lessonsProgress.filter(progress => progress.lessonType === LessonType.QUIZ);
        const AVG_SCORE =  AVG_SCORE_QUIZ.reduce((acum, val) => acum + val.quizScore, 0) / AVG_SCORE_QUIZ.length;

        const COMPLETED_LESSON = lessonsProgress.filter(progress => progress.is_completed).length;
        const COMPLETED_MODULES = modulesProgress.filter(progress => progress.is_completed).length;

        const PERCENTAGE = ((modulesProgress.length - COMPLETED_MODULES) / modulesProgress.length) * 100;

        return {
            lessonsProgress: {lessonsProgress},
            modulesProgress: {modulesProgress},
            courseProgress: {userProgress: userForProgress.courses_progress[courseProgress]},
            totalLessons: {TOTAL_LESSONS},
            avg_score: AVG_SCORE,

            completed_modules: COMPLETED_MODULES,
            completed_lessons: COMPLETED_LESSON,
            percentage: PERCENTAGE
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
                lessons_progress: {
                    select: {
                        is_completed: true,
                        complete_date: true,
                    }
                }
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
            user.lessons_progress.filter(lesson => lesson.is_completed).forEach(lesson => {
                const lessonDate = new Date(lesson.complete_date);
                lessonDate.setHours(0, 0, 0, 0); // Установим время в полночь
                const daysDiff = Math.floor((currentDate.getTime() - lessonDate.getTime()) / (24 * 60 * 60 * 1000));

                if (daysDiff < 7 && daysDiff >= 0) {
                    lessonsByDay[daysDiff].lessonCount += 1;
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
                courses_progress_length: user.courses_progress.filter(course => course.is_completed).length,
                modules_progress_length: user.modules_progress.filter(module => module.is_completed).length,
                lessons_progress_length: user.lessons_progress.filter(lesson => lesson.is_completed).length,
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
                    push: {
                        start_course: new Date().toISOString(),
                        complete_percentage: 0,
                        ...input.course_progress}
                },
            },
        });
    }),
    updateUserModulesProgress: procedure.input(z.object({
        id: z.string(),
        module_progress: z.object({
            real_module_id: z.string(),
            module_name: z.string(),
            module_id: z.string(),
            course_id: z.string(),
            is_completed: z.boolean(),
        }),
    }),
    ).mutation(async ({ctx, input}) => {
        const {id, module_progress} = input;

        const user = await ctx.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            return null;
        }

        const existingProgressIndex = user.modules_progress.findIndex(
            item => item?.module_id === module_progress.module_id,
        );

        if (existingProgressIndex !== -1) {
            user.modules_progress[existingProgressIndex] = module_progress;
        } else {
            user.modules_progress.push(module_progress);
        }

        const updatedUserModuleProgress = await ctx.user.update({
            where: {
                id,
            },
            data: {
                modules_progress: user.modules_progress,
            },
        });

        return updatedUserModuleProgress;
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
            read_later: z.boolean(),
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
    getUserModulesProgressById: procedure.input(z.object({
        id: z.string(),
        module_id: z.string(),
    }),
    ).query(async ({ctx, input}) => {
        const {id, module_id} = input;

        const user = await ctx.user.findUnique({
            where: {
                id,
            },
        });

        if (!user) {
            return null;
        }

        const existingProgressIndex = user.modules_progress.findIndex(
            item => item?.module_id === module_id,
        );

        if (existingProgressIndex === -1) {
            return null;
        }

        return user.modules_progress[existingProgressIndex];
    }),
    getUserReadLaterLessons: procedure.input(
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

        return user.lessons_progress.filter(lesson => lesson.read_later);
    }),
    updateIsCompletedCourse: procedure.input(
        z.object({
            user_id: z.string(),
            course_id: z.string()
        })).mutation(async ({ctx, input}) => {
        const user = await ctx.user.findUnique({
            where: {
                id: input.user_id
            }
        });
        if (user === null) {
            throw new Error("user not found");
        }
        const modulesProgress = user.modules_progress.filter(module => module.course_id === input.course_id);

        const COMPLETED_MODULES = modulesProgress.filter(progress => progress.is_completed).length;

        const PERCENTAGE = ((modulesProgress.length - COMPLETED_MODULES) / modulesProgress.length) * 100;

        return await ctx.user.update({
            where: {
                id: input.user_id
            },
            data: {
                courses_progress: {
                    updateMany: {
                        where: {
                            course_id: input.course_id
                        },
                        data: {
                            complete_percentage: 100 - PERCENTAGE,
                            is_completed: PERCENTAGE === 0,
                        }
                    }
                }
            }
        });
    }),
});