import React, {type ReactElement, useState} from "react";
import Layout from "@/pages/layout";
import {Button, Loader, SmallCard} from "@/shared/ui";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import UserLayout from "@/pages/user/layout";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {ErrorWidget} from "@/widgets/ErrorWidget";
import {useRole} from "@/shared/hooks";
import {UserRoles} from "@/enteties/User";
import {type Course} from "@/enteties/Course";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";

enum CourseType {
    MyCourses = "My Courses",
    SubscribedCourses = "Subscribed",
}

const CoursesPage = () => {
    const session = useSession();

    const [courseRendered, setCoursesRendered] = useState(
        CourseType.SubscribedCourses,
    );

    const role = useRole();

    const subscribedCourses = trpc.user.userSubscribedCourses.useQuery({
        id: session.data?.user?.id || "",
    });
    const myselfCourses = trpc.user.getUserCustomCourses.useQuery({
        id: session.data?.user?.id || "",
    });

    if (subscribedCourses.isLoading || myselfCourses.isLoading) {
        return <Loader />;
    }

    if (subscribedCourses.error || myselfCourses.error) {
        return <ErrorWidget/>;
    }

    return (
        <>
            <div className={"relative mb-10"}>
                <div className={" flex gap-3"}>
                    <div
                        className={`${
                            courseRendered === CourseType.SubscribedCourses
                            && "pb-3 border-b-4 border-light-primary-main dark:border-dark-primary-main z-[1]"
                        }`}
                    >
                        <Button
                            theme={ButtonThemes.TEXT}
                            onClick={() => {
                                setCoursesRendered(CourseType.SubscribedCourses);
                            }}
                        >
                            {CourseType.SubscribedCourses}
                        </Button>
                    </div>
                    <div
                        className={`${
                            courseRendered === CourseType.MyCourses
                            && "pb-3 border-b-4 border-light-primary-main dark:border-dark-primary-main z-[1]"
                        }`}
                    >
                        {
                            role === UserRoles.ADMIN || role === UserRoles.TEACHER ? <Button
                                theme={ButtonThemes.TEXT}
                                onClick={() => {
                                    setCoursesRendered(CourseType.MyCourses);
                                }}
                            >
                                {CourseType.MyCourses}
                            </Button> : <></>
                        }
                    </div>
                </div>
                <div
                    className={
                        "w-full h-[1px]  bg-light-primary-main dark:bg-dark-primary-main absolute bottom-[1px]"
                    }
                ></div>
            </div>
            <>
                {
                    (
                        <>
                            {courseRendered === CourseType.MyCourses ? (
                                <div className={"h-full grid grid-cols-repeat-auto-custom gap-5"}>
                                    {myselfCourses.data.length === 0 ? <div className={"flex flex-col  justify-center items-center "}>
                                        <h3 className={"text-3xl font-bold mb-5 text-center max-w-[450px] w-full"}>Looks like your course list is feeling a bit empty at the moment.</h3>
                                        <Link href={`${Routes.USER_PROFILE}`} className={"text-lg text-dark-primary-main underline"}>Let&#39;s create it up together!</Link>
                                    </div> : myselfCourses.data?.map(item =>
                                        <SmallCard key={item.id}
                                            course={item as Course}/>)}
                                </div>
                            ) : (
                                <div className={"h-full grid grid-cols-repeat-auto-custom gap-5"}>
                                    {subscribedCourses.data?.length === 0 ? <div className={"flex flex-col justify-center items-center "}>
                                        <h3 className={"text-3xl font-bold mb-5 text-center max-w-[450px] w-full"}>Looks like your course list is feeling a bit empty at the moment.</h3>
                                        <Link href={`${Routes.COURSES}`} className={"text-lg text-dark-primary-main underline"}>Let&#39;s fill it up together!</Link>
                                    </div> : subscribedCourses.data?.map(item =>
                                        <SmallCard key={item.id}
                                            course={item as Course}/>)}
                                </div>
                            )}
                        </>
                    )
                }
            </>
        </>
    );
};

CoursesPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>{page}</UserLayout>
        </Layout>
    );
};

export default CoursesPage;
