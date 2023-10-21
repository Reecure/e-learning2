/**
 * @link https://prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient =
    /* eslint-disable */
    (global as any).prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    /* eslint-disable */
    (global as any).prisma = prisma;
}