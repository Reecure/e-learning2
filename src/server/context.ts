import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import {prisma} from "@/shared/utils/prisma";
import {CreateContextOptions} from "vm";

// create context based of incoming request
export const createContext = async (
    opts?: trpcNext.CreateNextContextOptions,
) => {
    return {
        req: opts?.req,
        prisma,
        user: prisma.users,
        course: prisma.courses,
        modules: prisma.modules,
        lessons: prisma.lessons,
        news: prisma.news,
        reviews: prisma.reviews
    };
};
export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export async function createContextInner(_opts: CreateContextOptions) {
    return {};
}