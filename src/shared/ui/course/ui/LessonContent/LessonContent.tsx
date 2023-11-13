import {type FC, useState} from "react";
import {trpc} from "@/shared/utils/trpc";
import Badge, {BadgeColors} from "@/shared/ui/Badge/Badge";
import {Button, Loader,} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {useSession} from "next-auth/react";
import CourseLessonForm from "@/shared/ui/course/ui/CourseLessonForm/CourseLessonForm";
import {Lesson, LessonBlocks, LessonType, QuizBlocks} from "@/enteties/Lesson";
import CreateLessonQuizContent from "@/shared/ui/course/ui/CreateLessonQuizContent/CreateLessonQuizContent";
import CreateLessonContent from "@/shared/ui/course/ui/CreateLessonContent/CreateLessonContent";
import QuizComponent from "@/shared/ui/course/ui/QuizComponent/QuizComponent";
import InfoForUser from "@/shared/ui/InfoForUser/InfoForUser";
import LessonComponent from "@/shared/ui/course/ui/LessonComponent/LessonComponent";
import {ErrorWidget} from "@/widgets/ErrorWidget";

type Props = {
    currentLessonId: {
        lesson_id: string,
        progress_lesson_id: string
    },
};

const LessonContent: FC<Props> = ({currentLessonId}) => {
    const [lessonContentEditable, setLessonContentEditable] = useState(false);
    const [quizContentEditable, setQuizContentEditable] = useState(false);
    const [editableLesson, setLessonEditable] = useState(false);

    const [isLessonUpdateSuccess, setIsLessonUpdateSuccess] = useState({
        id: "",
        visible: false,
        isSuccess: false,
        error: ""
    });
    const lessonQuery = trpc.lesson.byId.useQuery({id: currentLessonId.lesson_id});

    const session = useSession();

    const editableLessonHandle = () => {
        setLessonEditable(prev => !prev);
    };

    const LessonContentEditableHandler = () => {
        setLessonContentEditable(prev => !prev);
    };
    const QuizContentEditableHandler = () => {
        setQuizContentEditable(prev => !prev);
    };

    const setIsLessonUpdateSuccessHandler = (id: string, visible: boolean, isSuccess: boolean, error?: string) => {
        setIsLessonUpdateSuccess({id: id, visible: visible, isSuccess: isSuccess, error: error || ""});
    };


    if (lessonQuery.isLoading) {
        return <Loader/>;
    }

    if (lessonQuery.error) {
        return <ErrorWidget/>;
    }

    return (
        <div className={"mb-14"}>
            <div className={"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-5"}>
                <div className={"flex gap-2 items-center"}>
                    <h4 className={"text-3xl sm:text-5xl font-extrabold my-3 sm:my-5"}>
                        {lessonQuery.data?.title}
                    </h4>
                    <Badge
                        color={BadgeColors.GREEN}
                        text={lessonQuery.data?.lesson_type || ""}
                    />
                </div>
                {lessonQuery.data?.author_id === session.data?.user.id && (
                    <div className={"flex gap-2 items-center"}>
                        <Button theme={ButtonThemes.FILLED} onClick={editableLessonHandle}>
                            Edit Lesson
                        </Button>
                        {lessonQuery.data?.lesson_type === LessonType.TEXT ? (
                            <Button
                                theme={ButtonThemes.FILLED}
                                onClick={LessonContentEditableHandler}
                            >
                                Edit Content
                            </Button>
                        ) : (
                            <Button
                                theme={ButtonThemes.FILLED}
                                onClick={QuizContentEditableHandler}
                            >
                                Edit Content
                            </Button>
                        )}
                    </div>
                )}
            </div>
            {lessonQuery.data?.lesson_type === LessonType.TEXT ? (
                lessonContentEditable ? (
                    <>
                        <CreateLessonContent
                            lessonId={currentLessonId.lesson_id}
                            setLessonContentEditable={LessonContentEditableHandler}
                            setIsSuccessVisible={setIsLessonUpdateSuccessHandler}
                            initialData={lessonQuery.data?.lesson_content.blocks as LessonBlocks[]}
                        />
                    </>
                ) : (
                    <>
                        <div className={"mb-5 w-full"}>
                            {isLessonUpdateSuccess.id === currentLessonId.lesson_id && isLessonUpdateSuccess.visible && (isLessonUpdateSuccess.isSuccess ?
                                <InfoForUser isSuccess text={"Success"}/> :
                                <InfoForUser isSuccess={false} text={"Error"}/>)}
                        </div>
                        <LessonComponent items={lessonQuery.data as Lesson}/>
                    </>
                )
            ) : quizContentEditable ? (

                <CreateLessonQuizContent
                    lessonId={currentLessonId.lesson_id}
                    setQuizContentEditable={QuizContentEditableHandler}
                    setIsSuccessVisible={setIsLessonUpdateSuccessHandler}
                    initialData={lessonQuery.data?.lesson_content.blocks as QuizBlocks[]}
                />
            ) : (
                <>
                    <QuizComponent
                        updateInfo={isLessonUpdateSuccess}
                        currentLessonId={currentLessonId}
                        blocks={lessonQuery.data?.lesson_content.blocks as QuizBlocks[]}
                    />
                </>
            )}
            <CourseLessonForm
                lessonId={currentLessonId.lesson_id}
                title={lessonQuery.data?.title || ""}
                type={lessonQuery.data?.lesson_type as LessonType}
                openModal={editableLesson}
                setModalOpen={editableLessonHandle}
            />
        </div>
    );
};

export default LessonContent;
