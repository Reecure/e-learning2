import {FC} from "react";

interface Props {
    totalQuestion: number,
    currentQuestion: number
}

const QuizProgressBar: FC<Props> = ({totalQuestion, currentQuestion}) => {
    const progress = (currentQuestion / totalQuestion) * 100;

    return (
        <div className={"flex items-center gap-3 w-[150px] sm:w-[300px]"}>
            <div className={`h-4 bg-neutral-200 dark:bg-neutral-600 rounded-full relative w-full`}>
                <div
                    className="h-full bg-light-primary-main dark:bg-dark-primary-main rounded-full absolute left-0 transition-all duration-200"
                    style={{width: `${progress}%`}}
                ></div>
            </div>
            <div className={"flex justify-end text-md whitespace-nowrap"}>
                {currentQuestion} / {totalQuestion}
            </div>
        </div>
    );
};

export default QuizProgressBar;