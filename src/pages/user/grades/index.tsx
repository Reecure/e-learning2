import {ReactElement, useEffect} from "react";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import {Button, ButtonThemes, Loader} from "@/shared/ui";
import {Routes} from "@/shared/config/routes";
import Link from "next/link";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";

const UserGrades = () => {
    const session = useSession();
    const coursesWithProgress = trpc.progress.getUserCoursesProgress.useQuery({user_id: session.data?.user.id || ""});
    // const user = trpc.progress.getUserProgressOnCourse.useQuery({user_id: session.data?.user.id || "", course_id: });

    useEffect(() => {
        console.log(coursesWithProgress.data);
    }, [coursesWithProgress.isLoading]);

    if (coursesWithProgress.isLoading || coursesWithProgress.data === undefined) {
        return <Loader/>;
    }

    if (coursesWithProgress.data?.length === 0) {
        return <div>You have not course</div>;
    }
    return (
        <div>
            <h3 className={"text-3xl sm:text-5xl font-bold mb-10"}>Your Progress</h3>
            <div className={"grid gap grid-cols-repeat-auto-custom"}>
                {
                    coursesWithProgress.data.map((course) => {
                        return <div key={course?.course_id} className={"p-4 border-2 border-dark-primary-main rounded-md w-[250px] sm:w-[300px]"}>
                            <div className={"flex flex-col gap-1 mb-5"} >
                                <h5 className={"text-2xl"}>{course?.course_name}</h5>
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
