import {z} from "zod";
import {procedure, router} from "../../trpc";
import {TRPCError} from "@trpc/server";
import {UserRoles} from "@/enteties/User";
import bcrypt from "bcrypt";
import {Prisma} from "@prisma/client";

const defaultUserSelect = Prisma.validator<Prisma.usersSelect>()({
    id: true,
    firstname: true,
    lastname: true,
    role: true,
    avatar: true,
    email: true
});

const defaultCoursesSelect = Prisma.validator<Prisma.usersSelect>()({
    courses: true
});


export const userRouter = router({
    all: procedure.input(z.object({
        limit: z.number().min(1).max(50).nullish(),
        cursor: z.string().nullish(),
    })).query(async ({ctx, input}) => {
        const limit = input.limit ?? 50;
        const {cursor} = input;

        const users = await ctx.user.findMany({
            select: defaultUserSelect,
            take: limit + 1,
            where: {},
            cursor: cursor? {
                id: cursor
            } : undefined
        });

        let nextCursor: typeof cursor | undefined = undefined;

        if (users.length > limit) {
            const nextItem = users.pop()!;
            nextCursor = nextItem.id;
        }

        return {
            users: users,
            nextCursor
        };

    }),
    userById: procedure.input(z.object({
        id: z.string().min(24).max(24)
    })).query(async ({ctx, input}) => {
        const user = await ctx.user.findUnique({
            where: {
                id: input.id
            }
        });
        if (!user) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: `No user with id '${input.id}'`,
            });
        }
        return user;
    }),
    getFavoriteCourse: procedure.input(z.object({
        id: z.string(),
        course_id: z.string()
    }),
    ).query(async ({ctx, input}) => {
        return await ctx.user.findUnique({
            where: {
                id: input.id
            },
            select: {
                favorite_course: true
            }
        });
    }),
    createUser: procedure.input(z.object({
        email: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        password: z.string(),
    }),
    ).mutation(async ({ctx, input}) => {
        const hashedPassword = await bcrypt.hash(input.password, 10);

        const user = await ctx.user.findFirst({
            where: {
                email: input.email,
            },
        });
        if (user) {
            throw new TRPCError({
                code: "CONFLICT",
                message: "User with this email exist",
            });
        } else {
            return ctx.user.create({
                data: {
                    firstname: input.firstname,
                    lastname: input.lastname,
                    email: input.email,
                    password: hashedPassword,
                    avatar: "",
                    role: UserRoles.USER,
                    courses: [],
                    is_new_user: true,
                    registration_date: new Date().toISOString(),
                    favorite_course: "",
                    last_course: "",
                    courses_progress: [],
                    modules_progress: [],
                    lessons_progress: [],
                },
            });
        }
    }),
    updateUser: procedure.input(z.object({
        email: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        role: z.string(),
    }),
    ).mutation(async ({ctx, input}) => {
        const user = await ctx.user.update({
            where: {
                email: input.email,
            },
            data: {
                email: input.email,
                firstname: input.firstname,
                lastname: input.lastname,
                role: input.role,
            },
            select: defaultUserSelect
        });
        return user;
    }),
    deleteUser: procedure.input(
        z.object({
            id: z.string(),
        }),
    ).mutation(async ({ctx, input}) =>{
        const user = ctx.user.delete({
            where: {
                id: input.id,
            },
            select:defaultUserSelect
        });
        return user;
    }),
    userSubscribedCourses: procedure.input(
        z.object({
            id: z.string().min(24).max(24)
        })
    ).query(async ({ctx, input}) => {
        const user = await ctx.user.findUnique({
            where: {
                id: input.id,
            },
        });

        const userCourses = user?.courses;

        const courses = await ctx.course.findMany({
            where: {
                id: {
                    in: userCourses
                }
            }
        });
        return courses;
    }),
    getUserCustomCourses: procedure.input(
        z.object({
            id: z.string().min(24).max(24),
        }),
    ).query(async ({ctx, input}) => {
        const customCourse = ctx.course.findMany({
            where: {
                author_id: input.id,
            },
        });
        return customCourse;
    }),
    updateLastVisitCourse: procedure.input(
        z.object({
            id: z.string(),
            course_id: z.string(),
        }),
    ).mutation(async ({ctx, input}) => {
        const user = await ctx.user.update({
            where: {
                id: input.id,
            },
            data: {
                last_course: input.course_id
            },
        });
        return user;
    }),
    updateFavoriteCourse: procedure.input(
        z.object({
            id: z.string(),
            course_id: z.string(),
        }),
    ).mutation(async ({ctx, input}) => {
        const user = await ctx.user.update({
            where: {
                id: input.id,
            },
            data: {
                favorite_course: input.course_id
            },
        });
        return user;
    }),
    updateUserCourses: procedure.input(
        z.object({
            id: z.string(),
            course_id: z.string(),
        }),
    ).mutation(async ({ctx, input}) => {
        const user = await ctx.user.update({
            where: {
                id: input.id,
            },
            data: {
                courses: {
                    push: input.course_id,
                },
            },
        });
        return user;
    }),
    deleteUserCourses: procedure.input(
        z.object({
            id: z.string(),
            course_id: z.string(),
        }),
    ).mutation(async ({ctx, input}) => {
        const userId = input.id;
        const courseId = input.course_id;

        const user = await ctx.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const updatedCourses = user.courses.filter(
            course => course !== courseId,
        );

        const userUpdatedCourses = await ctx.user.update({
            where: {
                id: userId,
            },
            data: {
                courses: updatedCourses,
            },
        });
        return userUpdatedCourses;
    }),
});