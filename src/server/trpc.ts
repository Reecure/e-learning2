import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import {transformer} from "@/shared/utils/transformer";

const t = initTRPC.context<Context>().create({
    transformer
});

export const router = t.router;
export const procedure = t.procedure;