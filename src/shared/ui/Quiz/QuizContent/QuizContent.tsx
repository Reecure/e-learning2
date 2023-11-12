import {FC} from "react";
import {
    AnswerWithFixedLetters,
    LessonBlocks,
    QuestionAnswerBlock,
    QuizBlocks,
    QuizContentType
} from "@/enteties/Lesson";
import CourseQuizGameQuestionWithAnswer from "@/shared/ui/course/ui/CourseQuizGames/CourseQuizGameQuestionWithAnswer";
import CourseQuizGameAnswerWithFixedLetters
    from "@/shared/ui/course/ui/CourseQuizGames/CourseQuizGameAnswerWithFixedLetters";

interface Props {
    currentQuestion: number;
    submitValuesVisible: boolean;
    submitHandler: () => void;
    blocks: QuizBlocks[];
    handleAnswerOptionClick: (val1: string, val2: string) => void;
}

const QuizContent: FC<Props> = ({
    submitHandler,
    submitValuesVisible,
    currentQuestion,
    handleAnswerOptionClick,
    blocks
}) => {

    const quizContentRender = (contentType: QuizContentType | string, block: QuizBlocks | LessonBlocks, handleAnswer: (arg1: string, arg2: string) => void) => {
        switch (contentType) {
        case QuizContentType.QUESTION_ANSWER:
            return (
                <CourseQuizGameQuestionWithAnswer
                    block={block as QuestionAnswerBlock}
                    handleAnswer={handleAnswer}
                    isLast={submitValuesVisible}

                    submitHandler={submitHandler}
                />
            );
        case QuizContentType.ANSWER_WITH_FIXED_LETTERS:
            return (
                <CourseQuizGameAnswerWithFixedLetters
                    block={block as AnswerWithFixedLetters}
                    handleAnswer={handleAnswer}
                    isLast={submitValuesVisible}
                    submitHandler={submitHandler}
                />
            );
        }
    };

    return (
        <div className={""}>
            {quizContentRender(
                blocks[currentQuestion].type,
                blocks[currentQuestion],
                handleAnswerOptionClick,
            )}
        </div>
    );
};

export default QuizContent;