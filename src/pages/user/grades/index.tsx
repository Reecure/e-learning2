import {type ReactElement, useEffect} from "react";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {Loader} from "@/shared/ui";

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
            {
                coursesWithProgress.data.map((course) => {
                    return <div key={course?.course_id} className={"p-4 border-2 border-amber-300 rounded-md"}>
                        <Link href={`${Routes.USER_GRADES}/course-grades/${course.course_id}`}>
                            {course?.course_name}
                        </Link>

                    </div>;
                })
            }
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
