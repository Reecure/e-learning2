import {type ReactElement, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {Button, Loader} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import CreateModule from "@/shared/ui/course/ui/CreateModule/CreateModule";
import CourseTabs from "@/shared/ui/course/ui/CourseTabs/CourseTabs";
import CourseHeader from "@/shared/ui/course/ui/CourseHeader/CourseHeader";
import CourseAboutTab from "@/shared/ui/course/ui/CourseTabs/CourseAboutTab";
import CourseReviewsTab from "@/shared/ui/course/ui/CourseTabs/CourseReviewsTab";
import CourseContentTab from "@/shared/ui/course/ui/CourseTabs/CourseContentTab";
import {BiErrorCircle} from "react-icons/bi";
import {Course} from "@/enteties/Course";


export enum Tabs {
    ABOUT = "About",
    COURSE_CONTENT = "Course content",
    REVIEWS = "Reviews",
}

const CoursePage = () => {
    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.ABOUT);
    const [courseModulesEdit, setCourseModuleEdit] = useState(false);
    const [isUserCourse, setIsUserCourse] = useState(false);

    const router = useRouter();
    const session = useSession();

    const courseQuery = trpc.course.courseById.useQuery({
        id: router.query.id as string,
    });

    const userHaveProgress = trpc.progress.getUserProgressOnCourse.useQuery({
        user_id: session.data?.user.id as string,
        course_id: router.query.id as string
    });

    useEffect(() => {
        if (session.data?.user.id === courseQuery.data?.author_id) {
            setIsUserCourse(true);
        }
    }, [session.data?.user.id, courseQuery.data?.author_id]);

    const courseModuleEditHandler = () => {
        setCourseModuleEdit(prev => !prev);
    };

    const setCurrentTabHandler = (current: Tabs) => {
        setCurrentTab(current);
    };

    if (courseQuery.isLoading) {
        return <Loader/>;
    }

    if (courseQuery.error) {
        router.push("/404");
    }

    return (
        <div>
            <CourseHeader
                course={courseQuery.data as Course}
                isUserCourse={isUserCourse}
            />
            <div className={""}>
                <div className={"flex justify-between items-center"}>
                    <CourseTabs
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTabHandler}
                    />
                    {currentTab === Tabs.COURSE_CONTENT && isUserCourse && (!courseModulesEdit ? (
                        <Button
                            theme={ButtonThemes.FILLED}
                            onClick={courseModuleEditHandler}
                            className={"ml-5"}
                        >
                            Edit
                        </Button>
                    ) : (
                        <div className={"flex gap-x-2"}>
                            <Button
                                theme={ButtonThemes.FILLED}
                                onClick={courseModuleEditHandler}
                                className={"ml-5"}
                            >
                                Close
                            </Button>
                        </div>
                    ))}
                </div>

                <div className={"mt-5"}>
                    {currentTab === Tabs.ABOUT && (
                        <CourseAboutTab
                            courseAboutText={courseQuery.data?.description || ""}
                        />
                    )}
                </div>

                <div>
                    {currentTab === Tabs.COURSE_CONTENT && (
                        <>
                            {
                                userHaveProgress.data === undefined &&
                                <div
                                    className={" flex items-center text-sm rounded-md text-dark-neutral-800 gap-3 w-full bg-dark-primary-container/20 py-1 px-2 border-2 border-dark-primary-container"}>
                                    <BiErrorCircle/>
                                    Add to your courses to check your statistic
                                </div>
                            }
                            {isUserCourse && courseModulesEdit && (
                                <CreateModule
                                    courseId={router.query.id as string}
                                />
                            )}
                            <CourseContentTab
                                courseModulesEdit={courseModulesEdit}
                                courseId={router.query.id as string}
                                isUserAuthor={isUserCourse}
                            />
                        </>
                    )}
                </div>

                <div className={"mt-5"}>
                    {currentTab === Tabs.REVIEWS && <CourseReviewsTab/>}
                </div>
            </div>
        </div>
    );
};

CoursePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>{page}</UserLayout>
        </Layout>
    );
};

export default CoursePage;