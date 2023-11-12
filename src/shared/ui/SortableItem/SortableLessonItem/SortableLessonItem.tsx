import React, {type FC, useEffect, useRef, useState} from "react";
import {AiOutlineCheck, AiOutlineClose, AiOutlineDown, AiOutlineFileText} from "react-icons/ai";
import {MdOutlineQuiz} from "react-icons/md";
import {setCurrentLessonId, setPreviewVisible} from "@/shared/ui/course/model";
import {Button, Loader} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {LessonType} from "@/enteties/Lesson";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {ModuleLesson} from "@/enteties/Module/model/types/module";
import {useRouter} from "next/router";
import LessonAuthorEditableSide from "@/shared/ui/SortableItem/SortableLessonItem/LessonAuthorEditableSide";

type Props = {
    item: ModuleLesson;
    disabled: boolean;
    deleteOpen: () => void;
};

const SortableLessonItem: FC<Props> = ({item, deleteOpen, disabled}) => {
    const utils = trpc.useContext();

    const [progressLoading, setProgressLoading] = useState(false);
    const [visibilityLoading, setVisibilityLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const session = useSession();
    const router = useRouter();

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const outsideClickHandle = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("click", outsideClickHandle);

        return () => {
            window.removeEventListener("click", outsideClickHandle);
        };
    }, []);


    const updateLessonProgress = trpc.progress.updateUserLessonsProgress.useMutation({
        async onSuccess() {
            await utils.progress.getUserLessonsProgressById.invalidate();
        }
    });

    const userProgressOnLesson = trpc.progress.getUserLessonsProgressById.useQuery({
        id: session.data?.user.id || "",
        lesson_id: item.id,
    });

    const updateVisibility = trpc.lesson.updateVisibility.useMutation({
        async onSuccess() {
            await utils.module.byId.invalidate();
        }
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (updateLessonProgress.status === "loading") {
            setProgressLoading(true);
        } else {
            setProgressLoading(false);
        }
    }, [updateLessonProgress.isLoading]);

    useEffect(() => {
        if (updateVisibility.status === "loading") {
            setVisibilityLoading(true);
        } else {
            setVisibilityLoading(false);
        }
    }, [updateVisibility.isLoading]);

    const setIsCompletedHandler = () => {
        try {
            updateLessonProgress.mutate({
                id: session.data?.user.id || "",
                lesson_progress: {
                    lesson_id: item.id,
                    module_id: router.query.id as string,
                    complete_date: new Date(),
                    lesson_name: item.title,
                    is_completed: userProgressOnLesson && userProgressOnLesson.data?.is_completed !== true || false,
                    quizScore: userProgressOnLesson && userProgressOnLesson.data?.quizScore || 0,
                    lessonType: item.lesson_type,
                    read_later: userProgressOnLesson && userProgressOnLesson.data?.read_later || false
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const setReadLaterHandler = () => {
        try {
            updateLessonProgress.mutate({
                id: session.data?.user.id || "",
                lesson_progress: {
                    lesson_id: item.id,
                    module_id: router.query.id as string,
                    complete_date: userProgressOnLesson && userProgressOnLesson.data?.complete_date || new Date(),
                    lesson_name: item.title,
                    is_completed: userProgressOnLesson && userProgressOnLesson.data?.is_completed || false,
                    quizScore: userProgressOnLesson && userProgressOnLesson.data?.quizScore || 0,
                    lessonType: item.lesson_type,
                    read_later: userProgressOnLesson && userProgressOnLesson.data?.read_later !== true || false
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const setMenuOpenVisibleHandler = () => {
        setMenuOpen(prev => !prev);
    };

    const updateVisibleHandler = () => {
        try {
            updateVisibility.mutate({
                id: item.id,
                is_visible: !item.is_visible,
                module_id: router.query.id as string
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={`flex justify-between items-center px-2 py-3 w-full rounded-md 
        ${item?.lesson_type === LessonType.TEXT ? "bg-blue-300 dark:bg-blue-300/30 hover:bg-blue-300/60 dark:hover:bg-blue-300/20" : "bg-red-300 dark:bg-red-300/30 hover:bg-red-300/60 dark:hover:bg-red-300/20"} duration-100 cursor-pointer`}>
            <div
                className={`flex items-center gap-1 ${userProgressOnLesson.data?.is_completed && "duration-300 opacity-30"}`}>

                {item?.lesson_type === LessonType.TEXT ? (
                    <span className={"text-md"}>
                        <AiOutlineFileText/>
                    </span>
                ) : (
                    <MdOutlineQuiz/>
                )}
                <p
                    className={"cursor-pointer"}
                    onClick={() => {
                        dispatch(setCurrentLessonId({
                            currentLessonId: {
                                lesson_id: item.lesson_id,
                                progress_lesson_id: item.id
                            }
                        }));
                        dispatch(setPreviewVisible(false));
                        updateLessonProgress.mutate({
                            id: session.data?.user.id || "",
                            lesson_progress: {
                                lesson_id: item.id,
                                lesson_name: item.title,
                                module_id: router.query.id as string || "",
                                complete_date: new Date(),
                                is_completed: userProgressOnLesson && userProgressOnLesson.data?.is_completed || false,
                                quizScore: userProgressOnLesson && userProgressOnLesson.data?.quizScore || 0,
                                lessonType: item.lesson_type,
                                read_later: userProgressOnLesson && userProgressOnLesson.data?.read_later || false
                            },
                        });
                    }}
                >
                    {item.title.length > 13 ? item.title.slice(0, 12) + "..." : item.title}
                </p>
            </div>

            {/*Client progress*/}
            <div className={"flex items-center"}>
                {disabled
                    && item?.lesson_type === LessonType.TEXT && (
                    progressLoading ? <span className={"!p-1 sm:!p-2"}><Loader className={"!w-4 !h-4 "}/></span>
                        : <Button
                            type={"submit"}

                            className={`${
                                userProgressOnLesson.data?.is_completed
                                    ? "!text-light-error-main dark:!text-dark-error-main"
                                    : "!text-green-600"
                            } ${progressLoading ? "!p-1 sm:!p-2 pointer-events-none !hover:none" : "!p-1 sm:!p-2"} !rounded-md`}
                            theme={ButtonThemes.TEXT}
                            onClick={() => {
                                setIsCompletedHandler();
                            }}
                        >
                            <>
                                {userProgressOnLesson.data?.is_completed ? (
                                    <AiOutlineClose/>
                                ) : (
                                    <AiOutlineCheck/>
                                )}
                            </>
                        </Button>
                )}


                {disabled && <div className={"relative"} ref={menuRef}>
                    <Button
                        type={"submit"}
                        className={`!p-1 sm:!p-2 !rounded-md`}
                        theme={ButtonThemes.TEXT}
                        onClick={setMenuOpenVisibleHandler}
                    >
                        <>
                            <AiOutlineDown/>
                        </>
                    </Button>
                    {
                        menuOpen && <div
                            className={"absolute top-10 right-2 bg-light-primary-container dark:bg-dark-primary-container p-3 rounded-md w-40 text-sm z-10"}>
                            {(disabled &&
                                <LessonAuthorEditableSide visibilityLoading={visibilityLoading}
                                    updateVisibleHandler={updateVisibleHandler}
                                    is_visible={item.is_visible}
                                    read_later_Loading={progressLoading}
                                    deleteOpen={deleteOpen}
                                    read_later={userProgressOnLesson.data?.read_later || false}
                                    updateReadLaterHandler={setReadLaterHandler}
                                    author_id={item.author_id}
                                />)}
                        </div>
                    }
                </div>}
            </div>
        </div>
    );
};

export default SortableLessonItem;
