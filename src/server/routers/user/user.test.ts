/**
 * Integration test example for the `post` router
 */
import {createContext} from "../../context";
import {appRouter} from "../_app";
import {User} from "@/enteties/User";

const testUser: User = {
    id: "65228aa9e2c5aac7b78511b1",
    avatar: "",
    courses: [],
    email: "user",
    firstname: "Roflan",
    is_new_user: true,
    lastname: "Roflanich",
    password: "$2b$10$mt3sgIuqPwg5cwim9v9rneNT0ThKUbWOlOvUQckmly2YFly3JRUb.",
    registration_date: new Date("2023-10-08T10:55:37.835Z"),
    role: "admin",
    last_course: "",
    favorite_course: "",
    courses_progress: [],
    lessons_progress: [],
    modules_progress: []
};

// const input: inferProcedureInput<AppRouter["user"]["createUser"]> = {
//     firstname: "First",
//     email: "example123@gmail.com",
//     lastname: "Last",
//     password: "12345678",
// };
// const user = await caller.user.createUser(input);
test("get user", async () => {
    const ctx = await createContext();
    const caller = appRouter.createCaller(ctx);

    const byId = await caller.user.userById({id: "65228aa9e2c5aac7b78511b1"});

    expect(byId).toMatchObject(testUser);
});
