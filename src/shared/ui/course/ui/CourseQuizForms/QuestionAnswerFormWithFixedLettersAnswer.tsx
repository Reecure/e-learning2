import {type FC} from "react";
import QuizFormWithOneAnswer from "@/shared/ui/course/ui/CourseQuizForms/QuizFormWithOneAnswer/QuizFormWithOneAnswer";

type Props = {
    index: number;
};

const QuestionAnswerFormWithFixedLettersAnswer: FC<Props> = ({index}) => {

    return (
        <QuizFormWithOneAnswer index={index} title={"Answer with fixed letters"}/>
    );
};

export default QuestionAnswerFormWithFixedLettersAnswer;

