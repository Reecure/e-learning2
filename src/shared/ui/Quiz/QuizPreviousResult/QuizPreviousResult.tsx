import {FC} from "react";

interface Props {
    res: number;
}

const QuizPreviousResult: FC<Props> = ({res}) => {

    return (
        <p className={"text-lg font-bold "}>
            Your previous result <span className={"text-blue-400 dark:text-blue-700 text-xl"}>{res}</span>
        </p>
    );
};

export default QuizPreviousResult;