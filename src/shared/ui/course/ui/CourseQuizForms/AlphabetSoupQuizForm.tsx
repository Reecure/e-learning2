import {FC} from "react";
import QuizFormWithOneAnswer from "@/shared/ui/course/ui/CourseQuizForms/QuizFormWithOneAnswer/QuizFormWithOneAnswer";

interface Props {
    index: number;
}

const AlphabetSoupQuiz: FC<Props> = ({index}) => {

    return (
        <>
            <QuizFormWithOneAnswer title={"Alphabet Soup Quiz"} index={index}/>
        </>
    );
};

export default AlphabetSoupQuiz;