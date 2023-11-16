import {FC} from "react";
import {Button, ButtonThemes} from "@/shared/ui";

interface Props {
    score: number,
    setCurrentQuestion: (value: number) => void,
    setScore: (value: number) => void,
    setShowScore: (value: boolean) => void
    totalQuestions: number
}

const baseClass = "flex flex-col items-center";
const textStyle = "!text-xs font-bold uppercase text-neutral-900 dark:text-neutral-400";
const highlightText = "text-blue-700 dark:text-blue-400 text-2xl font-extrabold mt-2";

const renderGridItem = (label: string, value: string) => (
    <div key={label} className={`${baseClass}`}>
        <p className={`${textStyle}`}>{label}</p>
        <p className={`${highlightText}`}>{value}</p>
    </div>
);

const QuizShowScore: FC<Props> = ({totalQuestions, setScore, score, setShowScore, setCurrentQuestion}) => {
    return (
        <div className={"flex flex-col items-center bg-neutral-300/60 dark:bg-neutral-600/20 gap-10 p-5 rounded-md"}>
            <h5 className={"text-4xl font-bold text-center sm:text-start rounded-md text-neutral-900 dark:text-neutral-300"}>
                You get <span className={"text-blue-700 dark:text-blue-400 font-extrabold"}>+{score}</span> Quiz Points
            </h5>
            <div className={"grid grid-cols-2 gap-5 w-full rounded-md"}>
                {
                    [
                        renderGridItem("Correct", score.toString()),
                        renderGridItem("Accuracy", `${((score / totalQuestions) * 100).toFixed()}%`),
                        renderGridItem("Incorrect", (totalQuestions - score).toString())
                    ]
                }
            </div>

            <div className={"flex gap-3"}>
                <Button
                    theme={ButtonThemes.FILLED}
                    onClick={() => {
                        setShowScore(false);
                        setScore(0);
                        setCurrentQuestion(0);
                    }}
                >
                    Try again
                </Button>
            </div>
        </div>
    );
};

export default QuizShowScore;