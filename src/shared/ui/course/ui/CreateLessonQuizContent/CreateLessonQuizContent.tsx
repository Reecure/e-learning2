import {type FC, useEffect} from "react";
import {FormProvider, useFieldArray, useForm} from "react-hook-form";
import {trpc} from "@/shared/utils/trpc";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {v4 as uuidv4} from "uuid";
import QuestionAnswerForm from "@/shared/ui/course/ui/CourseQuizForms/QuestionAnswerForm";
import QuestionAnswerFormWithFixedLettersAnswer
    from "@/shared/ui/course/ui/CourseQuizForms/QuestionAnswerFormWithFixedLettersAnswer";
import {QuizBlocks, QuizContentType} from "@/enteties/Lesson";
import {AiOutlineClose} from "react-icons/ai";
import AlphabetSoupQuizForm from "@/shared/ui/course/ui/CourseQuizForms/AlphabetSoupQuizForm";
import TrueFalseQuizForm from "@/shared/ui/course/ui/CourseQuizForms/TrueFalseQuizForm";


export type FormData = {
    blocks: QuizBlocks[];
};

type Props = {
    lessonId: string;
    initialData: QuizBlocks[];
    setQuizContentEditable: () => void
    setIsSuccessVisible: (id: string, visible: boolean, isSuccess: boolean, error?: string) => void
};

const QUIZ_FORM_STYLE = "flex gap-2 items-start bg-light-neutral-900/60  dark:bg-neutral-600/30 rounded-xl px-5 py-5";


const CreateLessonQuizContent: FC<Props> = ({initialData, setQuizContentEditable, setIsSuccessVisible, lessonId}) => {
    const utils = trpc.useContext();
    const lessonUpdateContentQuery = trpc.lesson.updateContent.useMutation({
        async onSuccess() {
            await utils.lesson.byId.invalidate();
        }
    });

    const methods = useForm<FormData>({
        defaultValues: {blocks: initialData || []},
    });
    const {handleSubmit, reset} = methods;

    useEffect(() => {
        reset({blocks: initialData || []});
    }, [initialData, reset]);

    const onSubmit = (data: FormData) => {
        try {
            lessonUpdateContentQuery.mutate({
                id: lessonId,
                lesson_content: {...data},
            });
        } catch (e) {
            console.log(e);
        } finally {
            setQuizContentEditable();
            setIsSuccessVisible(lessonId, true, true);

        }
    };

    const renderCloseButton = (index: number) => (
        <Button
            theme={ButtonThemes.TEXT}
            className="!p-2 !rounded-md"
            type="button"
            onClick={() => {
                remove(index);
            }}
        >
            <AiOutlineClose/>
        </Button>
    );

    const {append, fields, remove} = useFieldArray({
        control: methods.control,
        name: "blocks",
    });

    const addAnswerWithFixedLetters = () => {
        append({
            id: uuidv4(),
            type: QuizContentType.ANSWER_WITH_FIXED_LETTERS,
            question: "",
            answer: "",
        });
    };

    const addAlphabetSoupQuiz = () => {
        append({
            id: uuidv4(),
            type: QuizContentType.ALPHABET_SOUP_QUIZ,
            question: "",
            answer: ""
        });
    };

    const addTrueFalseQuiz = () => {
        append({
            id: uuidv4(),
            type: QuizContentType.TRUE_FALSE,
            question: "",
            answer: ""
        });
    };

    const addQuestionAnswerBlock = () => {
        append({
            id: uuidv4(),
            type: QuizContentType.QUESTION_ANSWER,
            question: "",
            correctAnswer: "",
            answer: [
                {
                    otherAnswer: "",
                },
            ],
        });
    };

    const addButtons = [{
        title: "Add Question Answer",
        func: addQuestionAnswerBlock
    },
    {
        title: "Add Alphabet Soup Quiz",
        func: addAlphabetSoupQuiz
    },
    {
        title: "Add Answer with fixed letters",
        func: addAnswerWithFixedLetters
    },
    {
        title: "Add True False",
        func: addTrueFalseQuiz
    },
    ];

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={"flex flex-col gap-2 "}
            >
                {fields.map((field, index) => (
                    <div key={field.id}>
                        {
                            field.type === QuizContentType.QUESTION_ANSWER && (
                                <div className={QUIZ_FORM_STYLE}>
                                    <QuestionAnswerForm index={index}/>
                                    {renderCloseButton(index)}
                                </div>
                            )
                        }
                        {
                            field.type === QuizContentType.ANSWER_WITH_FIXED_LETTERS && (
                                <div className={QUIZ_FORM_STYLE}>
                                    <QuestionAnswerFormWithFixedLettersAnswer index={index}/>
                                    {renderCloseButton(index)}
                                </div>
                            )
                        }
                        {
                            field.type === QuizContentType.ALPHABET_SOUP_QUIZ && (
                                <div
                                    className={QUIZ_FORM_STYLE}>
                                    <AlphabetSoupQuizForm index={index}/>
                                    {renderCloseButton(index)}
                                </div>
                            )
                        }
                        {
                            field.type === QuizContentType.TRUE_FALSE && (
                                <div
                                    className={QUIZ_FORM_STYLE}>
                                    <TrueFalseQuizForm index={index}/>
                                    {renderCloseButton(index)}
                                </div>
                            )
                        }
                    </div>
                ))}

                <div
                    className={"grid grid-cols-1 gap-2 md:grid-cols-4 mt-5 sm:mt-0 bg-neutral-600/30 p-5 md:p-2 rounded-md"}>
                    {
                        addButtons.map(item => (
                            <Button key={item.title} theme={ButtonThemes.FILLED} onClick={item.func}>
                                {item.title}
                            </Button>
                        ))
                    }
                </div>
                <div className={"flex justify-end "}>
                    <Button theme={ButtonThemes.FILLED} type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default CreateLessonQuizContent;
