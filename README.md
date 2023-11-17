## Project Setup

1. Run `pnpm install` to install project dependencies
2. Run `npx prisma generate` to generate Prisma Client.
3. Connect your mongodb. Shared your mongodb link in .env file.
4. `pnpm dev` for regular startup.

---

## Available Scripts

Use these scripts to manage the project:

- `dev` : This script launches a development server using Webpack to serve the application. It sets an environment
  variable port to 3000, specifying the port on which the server will listen.

- `build`: Triggers build process in development mode.

- `start`: Launch the project using the compiled code.

- `lint` : Executes ESLint to analyze for code quality

- `lint-fix` : Similar to the previous script, this command also uses ESLint to analyze files, attempting
  to automatically fix any fixable issues by applying suggested code changes.

- `test` : Executes Jest tests

---

## Project Architecture

This project follows the [Feature-Sliced Design](https://feature-sliced.design/) approach.

---

## Tests

In project use [Jest](https://jestjs.io/) along
with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing.

---

## Forms

I utilize [React Hook Form](https://react-hook-form.com/docs/useform) for handling forms and [Zod](https://zod.dev/) for
form validation.

---

## Enteties

- [Course](src/enteties/Course)
- [Lesson](src/enteties/Lesson)
- [Module](src/enteties/Module)
- [News](src/enteties/News)
- [Review](src/enteties/Review)
- [User](src/enteties/User)

---

## Server routes

- [Course route](src/server/routers/course)
- [Lesson route](src/server/routers/lesson)
- [Module route](src/server/routers/module)
- [News route](src/server/routers/news)
- [Progress route](src/server/routers/progress)
- [Reviews route](src/server/routers/reviews)
- [User route](src/server/routers/user)