import {FC} from "react";
import {Button, ButtonThemes} from "@/shared/ui";

interface Props {
    score: number,
    setCurrentQuestion: (value: number) => void,
    setScore: (value: number) => void,
    setShowScore: (value: boolean) => void
    totalQuestions: number
}

const QuizShowScore: FC<Props> = ({totalQuestions, setScore, score, setShowScore, setCurrentQuestion}) => {

    return (
        <div className={"flex flex-col items-center bg-neutral-600/20 gap-10 p-5 rounded-md"}>
            <h5 className={"text-4xl font-bold rounded-md text-neutral-300"}>You get <span
                className={"text-blue-400 font-extrabold"}>+{score}</span> Quiz Points</h5>
            <div className={"grid grid-cols-2 gap-5 w-full rounded-md"}>
                <div className={"flex flex-col items-center"}>
                    <p className={"!text-xs font-bold uppercase text-neutral-400"}>Correct Answer</p>
                    <p className={"text-blue-400 text-2xl font-extrabold mt-2"}>{score}</p>
                </div>
                <div className={"flex flex-col items-center"}>
                    <p className={"!text-xs font-bold uppercase text-neutral-400"}>Accuracy</p>
                    <p className={"text-blue-400 text-2xl font-extrabold mt-2"}>{((score / totalQuestions) * 100).toFixed()}%</p>
                </div>
                <div className={"flex flex-col items-center"}>
                    <p className={"!text-xs font-bold uppercase text-neutral-400"}>Incorrect</p>
                    <p className={"text-blue-400 text-2xl font-extrabold mt-2"}>{totalQuestions - score}</p>
                </div>
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
                <Button theme={ButtonThemes.FILLED}>
                    Check Correct Answers
                </Button>
            </div>
        </div>
    );
};

export default QuizShowScore;