import {FC} from "react";
import {
    AlphabetSoupQuiz,
    AnswerWithFixedLetters,
    LessonBlocks,
    QuestionAnswerBlock,
    QuizBlocks,
    QuizContentType,
    TrueFalseQuiz
} from "@/enteties/Lesson";
import CourseQuizGameQuestionWithAnswer from "@/shared/ui/course/ui/CourseQuizGames/CourseQuizGameQuestionWithAnswer";
import CourseQuizGameAnswerWithFixedLetters
    from "@/shared/ui/course/ui/CourseQuizGames/CourseQuizGameAnswerWithFixedLetters";
import AlphabetSoupQuizGame from "@/shared/ui/course/ui/CourseQuizGames/AlphabetSoupQuizGame";
import TrueFalseQuizGame from "@/shared/ui/course/ui/CourseQuizGames/TrueFalseQuizGame";

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
        case QuizContentType.ALPHABET_SOUP_QUIZ:
            return (
                <AlphabetSoupQuizGame
                    block={block as AlphabetSoupQuiz}
                    handleAnswer={handleAnswer}
                    isLast={submitValuesVisible}
                    submitHandler={submitHandler}
                />
            );
        case QuizContentType.TRUE_FALSE:
            return (
                <TrueFalseQuizGame
                    block={block as TrueFalseQuiz}
                    handleAnswer={handleAnswer}
                    isLast={submitValuesVisible}
                    submitHandler={submitHandler}
                />
            );
        }
    };

    return (
        <div>
            {quizContentRender(
                blocks[currentQuestion].type,
                blocks[currentQuestion],
                handleAnswerOptionClick,
            )}
        </div>
    );
};

export default QuizContent;