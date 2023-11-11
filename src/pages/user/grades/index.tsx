import {ReactElement, useEffect} from "react";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import {Button, ButtonThemes, Loader} from "@/shared/ui";
import {Routes} from "@/shared/config/routes";
import Link from "next/link";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import Badge, {BadgeColors} from "../../../shared/ui/Badge/Badge";

const UserGrades = () => {
    const session = useSession();
    const coursesWithProgress = trpc.progress.getUserCoursesProgress.useQuery({user_id: session.data?.user.id || ""});

    useEffect(() => {
        console.log(coursesWithProgress.data);
    }, [coursesWithProgress.isLoading]);

    if (coursesWithProgress.isLoading || coursesWithProgress.data === undefined) {
        return <Loader/>;
    }

    if (coursesWithProgress.data?.length === 0) {
        return <div className="flex flex-col items-center justify-center h-screen text-center">
            <Link href={Routes.COURSES} className="text-blue-600 underline">
                Find your course and watch your statistic
            </Link>
            <div className="flex flex-col mt-5">
                <h5 className="text-4xl font-bold">You haven&apos;t course with progress</h5>
            </div>
        </div>;
    }
    return (
        <div>
            <h3 className={"text-3xl sm:text-5xl font-bold mb-10"}>Your Progress</h3>
            <div className={"grid gap-5 grid-cols-repeat-auto-progress-custom"}>
                {
                    coursesWithProgress.data.map((course) => {
                        return <div key={course?.course_id}
                            className={"p-4 border-2 border-light-primary-main dark:border-dark-primary-main rounded-md justify-center w-[300px]"}>
                            <div className={"flex flex-col gap-1 mb-5"}>
                                <h5 className={"text-2xl"}>{course?.course_name}</h5>
                                <div className={""}>{course?.is_completed ?
                                    <Badge text={"completed"} color={BadgeColors.GREEN}
                                        className={"text-[12px] !mb-0"}/>
                                    :
                                    <Badge text={"uncompleted"} color={BadgeColors.RED}
                                        className={"text-[12px] !mb-0"}/>}</div>
                            </div>
                            <div className={"flex justify-end"}>
                                <Link href={`${Routes.USER_GRADE_PAGE}/${course.course_id}`}>
                                    <Button theme={ButtonThemes.FILLED}>
                                        Progress
                                    </Button>
                                </Link>
                            </div>

                        </div>;
                    })
                }
            </div>
        </div>
    );
};

UserGrades.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>{page}</UserLayout>
        </Layout>
    );
};

export default UserGrades;
