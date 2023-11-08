import {router} from "../trpc";
import {userRouter} from "../routers/user/user";
import {courseRouter} from "../routers/course/course";
import {moduleRouter} from "../routers/module/module";
import {lessonRouter} from "../routers/lesson/lesson";
import {progressRouter} from "@/server/routers/progress/progress";
import {newsRouter} from "@/server/routers/news/news";

export const appRouter = router({
    user: userRouter,
    course: courseRouter,
    module: moduleRouter,
    lesson: lessonRouter,
    progress: progressRouter,
    news: newsRouter
});

export type AppRouter = typeof appRouter;