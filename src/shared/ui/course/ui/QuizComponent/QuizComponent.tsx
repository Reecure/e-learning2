import {type FC, useEffect, useState} from "react";
import {Loader} from "@/shared/ui";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {QuizBlocks} from "@/enteties/Lesson";
import InfoForUser from "@/shared/ui/InfoForUser/InfoForUser";
import {useRouter} from "next/router";
import QuizProgressBar from "@/shared/ui/Quiz/QuizProgressBar/QuizProgressBar";
import QuizPreviousResult from "@/shared/ui/Quiz/QuizPreviousResult/QuizPreviousResult";
import QuizShowScore from "@/shared/ui/Quiz/QuizShowScore/QuizShowScore";
import QuizContent from "@/shared/ui/Quiz/QuizContent/QuizContent";

type Props = {
    updateInfo: {
        id: string,
        visible: boolean,
        isSuccess: boolean,
        error?: string
    }
    currentLessonId: {
        lesson_id: string,
        progress_lesson_id: string
    },
    blocks: QuizBlocks[];
};

const QuizComponent: FC<Props> = ({blocks, currentLessonId, updateInfo}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [submitValuesVisible, setSubmitValuesVisible] = useState(false);

    const session = useSession();
    const router = useRouter();

    const updateLessonProgress = trpc.progress.updateUserLessonsProgress.useMutation();
    const getLessonInfoById = trpc.module.lessonInfoByModuleId.useQuery({
        lesson_id: currentLessonId.lesson_id,
        module_id: router.query.id as string,
    });
    const getLessonProgressById = trpc.progress.getUserLessonsProgressById.useQuery({
        lesson_id: currentLessonId.progress_lesson_id,
        id: session.data?.user.id || "",
    });

    useEffect(() => {
        if (blocks.length === 1) {
            setSubmitValuesVisible(true);
        }
    }, [blocks, showScore]);

    useEffect(() => {
        if (showScore) {
            try {
                updateLessonProgress.mutate({
                    id: session.data?.user.id || "",
                    lesson_progress: {
                        lesson_id: getLessonInfoById.data?.id || "",
                        module_id: router.query.id as string,
                        complete_date: new Date(),
                        lesson_name: getLessonInfoById.data?.title || "",
                        is_completed: true,
                        quizScore: score,
                        lessonType: getLessonInfoById.data?.lesson_type || "",
                        read_later: getLessonProgressById.data?.read_later || false,
                    },
                });
            } catch (e) {
                console.log(e);
            }
        }
    }, [showScore]);

    const handleAnswerOptionClick = (blockAnswer: string, answer: string) => {
        let updatedScore = score;
        if (blockAnswer === answer) {
            updatedScore += 1;
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < blocks.length) {
            setCurrentQuestion(nextQuestion);
            if (nextQuestion === blocks.length - 1) {
                setSubmitValuesVisible(true);
            }
        }
        setScore(updatedScore);
    };

    const submitHandler = () => {
        setShowScore(true);
        setSubmitValuesVisible(false);
    };

    if (getLessonProgressById.isLoading) {
        return <Loader/>;
    }

    return (
        <div className={"flex flex-col items-center justify-center"}>
            <div className={"mb-5 w-full"}>
                {currentLessonId.lesson_id === updateInfo.id && updateInfo.visible && (updateInfo.isSuccess ?
                    <InfoForUser isSuccess text={"Success"}/> :
                    <InfoForUser isSuccess={false} text={"Error"}/>)}
            </div>
            <div>
                {showScore ? (
                    <QuizShowScore
                        score={score}
                        setCurrentQuestion={(value: number) => setCurrentQuestion(value)}
                        setScore={(value: number) => setScore(value)}
                        setShowScore={(value: boolean) => setShowScore(value)}
                        totalQuestions={blocks?.length}
                    />

                ) : (
                    <div className={"flex flex-col w-[200px] xs:w-[300px] md:w-[500px] gap-5"}>
                        <div className={"mx-auto"}>
                            {blocks?.length && (
                                <QuizPreviousResult res={getLessonProgressById.data?.quizScore || 0}/>
                            )}
                        </div>
                        <div className={"mx-auto"}>
                            {blocks?.length ? (
                                <QuizProgressBar totalQuestion={blocks?.length} currentQuestion={currentQuestion + 1}/>
                            ) : (
                                <QuizProgressBar totalQuestion={0} currentQuestion={0}/>
                            )}
                        </div>
                        <div className={"flex"}>
                            {blocks?.length === 0 || blocks === undefined ? (
                                <div className={"text-xl font-bold"}>No questions yet</div>
                            ) : (
                                <div className={"flex flex-col gap-5 w-full"}>
                                    <p className={"text-2xl text-blue-700 dark:text-blue-400"}>
                                        Question - {currentQuestion + 1}</p>
                                    <QuizContent
                                        currentQuestion={currentQuestion}
                                        submitValuesVisible={submitValuesVisible}
                                        submitHandler={submitHandler}
                                        blocks={blocks}
                                        handleAnswerOptionClick={(blockAnswer: string, answer: string) => handleAnswerOptionClick(blockAnswer, answer)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizComponent;
