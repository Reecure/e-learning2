import {ReactElement, useEffect, useState} from "react";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {trpc} from "@/shared/utils/trpc";
import {useRouter} from "next/router";
import LessonContent from "@/shared/ui/course/ui/LessonContent/LessonContent";
import CreateLesson from "@/shared/ui/course/ui/CreateLesson/CreateLesson";
import {Button, ButtonThemes, Overlay} from "@/shared/ui";
import CourseLessons from "@/shared/ui/course/ui/CourseLessons/CourseLessons";
import {useAppDispatch, useAppSelector} from "@/app/ReduxProvider/config/hooks";
import {currentLessonSelector, setCurrentLessonId, setPreviewVisible} from "@/shared/ui/course/model";
import {useCurrentUser} from "@/shared/hooks";
import {isLessonPreviewVisible} from "@/shared/ui/course/model/selectors/currentLessonSelector";
import {AiOutlineClose} from "react-icons/ai";
import {BiLeftArrow} from "react-icons/bi";
import {Routes} from "@/shared/config/routes";
import StubText from "@/shared/ui/StubText/StubText";
import {HiOutlineDocumentText} from "react-icons/hi";
import {LessonType} from "@/enteties/Lesson";

const CourseModuleLessonsPage = () => {
    const [canLessonEdit, setCanLessonEdit] = useState(false);
    const [isUserCourse, setIsUserCourse] = useState(false);
    const [lessonSidebarOpen, setLessonSidebarOpen] = useState(true);

    const router = useRouter();
    const currentUserId = useCurrentUser();

    const dispatch = useAppDispatch();

    const moduleQuery = trpc.module.byId.useQuery({
        id: router.query.id as string
    });

    const currentLesson = useAppSelector(currentLessonSelector);

    const isVisiblePreview = useAppSelector(isLessonPreviewVisible);

    useEffect(() => {
        if (currentUserId === moduleQuery.data?.author_id) {
            setIsUserCourse(true);
        }
    }, [moduleQuery]);

    const CanLessonEditHandler = () => {
        setCanLessonEdit(prev => !prev);
    };

    const setLessonSidebarOpenHandler = () => {
        setLessonSidebarOpen(prev => !prev);
    };

    if (moduleQuery.error) {
        router.push("/404");
    }


    return (
        <div className={"flex"}>
            {
                lessonSidebarOpen && <div
                    className={
                        "fixed top-0 left-0 h-screen bg-light-neutral-900 dark:bg-dark-neutral-100 p-5 max-w-[250px] w-full md:sticky md:h-[calc(100vh_-_62px)] z-[99]"
                    }
                >
                    <Button theme={ButtonThemes.CLEAR} onClick={setLessonSidebarOpenHandler}
                        className={"!p-0 md:hidden"}><AiOutlineClose/></Button>

                    <div className={" mb-5"}>
                        <div className={"flex items-center whitespace-nowrap mb-5"}>
                            <Button theme={ButtonThemes.TEXT} className={"!px-2 !py-1 !h-8 rounded-md"}
                                onClick={() => router.push(`${Routes.USER_COURSE_PAGE}/${moduleQuery.data?.course_id}`)}><BiLeftArrow/></Button>
                            <p className={"text-lg ml-1"}>Go back</p>
                        </div>

                        {isUserCourse &&
                            <Button theme={ButtonThemes.FILLED}
                                onClick={CanLessonEditHandler}
                                className={"w-full !py-1"}>
                                {!canLessonEdit ? "Edit" : "Close"}
                            </Button>
                        }
                    </div>
                    {isUserCourse && canLessonEdit && (
                        <CreateLesson moduleId={router.query.id as string}/>
                    )}

                    <CourseLessons
                        isUserLessons={isUserCourse}
                        moduleId={router.query.id as string}
                        lessonCanEdit={canLessonEdit}
                    />
                </div>
            }

            {
                lessonSidebarOpen && <div className={"!z-[89] md:invisible"}>
                    <Overlay onClick={setLessonSidebarOpenHandler}/>
                </div>
            }

            <Button theme={ButtonThemes.FILLED} className={"fixed bottom-0 right-[0%] text-xl !p-4 md:hidden"}
                onClick={setLessonSidebarOpenHandler}>
                <HiOutlineDocumentText/>
            </Button>

            <div className={"ml-5 w-full overflow-y-auto mr-5 md:mr-10 xl:mr-20"}>
                {
                    isVisiblePreview ? <div className={"p-5"}>
                        <h3 className={"text-2xl md:text-3xl mb-5 font-bold"}>{moduleQuery.data?.title}</h3>
                        {
                            moduleQuery.data?.lessons.length === 0 ?
                                <div className={"w-full flex justify-center items-center"}>
                                    <StubText title={"There are no lessons"}/>
                                </div> :

                                <ul className={"list-disc flex flex-col gap-2 list-inside"}>
                                    {
                                        moduleQuery.data?.lessons.map(lesson => (
                                            lesson.is_visible &&
                                            <li onClick={() => {
                                                dispatch(setCurrentLessonId({
                                                    currentLessonId: {
                                                        lesson_id: lesson.lesson_id,
                                                        progress_lesson_id: lesson.id
                                                    }
                                                }));
                                                dispatch(setPreviewVisible(false));
                                            }} key={lesson.id}
                                            className={`px-2 py-1 rounded-md max-w-[500px] ${lesson?.lesson_type === LessonType.TEXT ? "bg-blue-300 dark:bg-blue-300/30 " +
                                                    "hover:bg-blue-300/60" : "bg-red-300 dark:bg-red-300/30 hover:bg-red-300/60"}`}>{lesson.title}</li>
                                        ))
                                    }
                                </ul>
                        }
                    </div> : <LessonContent currentLessonId={currentLesson}/>
                }
            </div>
        </div>
    );
};

CourseModuleLessonsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout contentClassName={"!p-0"}>{page}</UserLayout>
        </Layout>
    );
};

export default CourseModuleLessonsPage;
