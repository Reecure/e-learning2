import {FC, useState} from "react";
import {TrueFalseQuiz} from "@/enteties/Lesson";
import {Button, ButtonThemes} from "@/shared/ui";

interface Props {
    block: TrueFalseQuiz;
    handleAnswer: (correct: string, userSelect: string) => void;
    isLast: boolean;
    submitHandler: () => void;
}

const TrueFalseQuizGame: FC<Props> = ({submitHandler, isLast, block, handleAnswer}) => {

    const [selectedAnswer, setSelectedAnswer] = useState<string>("");

    const selectAnswerHandler = (val: string) => {
        setSelectedAnswer(val);
    };

    return (
        <div className={"w-full "}>
            <div className={"flex flex-col items-center"}>
                <h5 className={"text-lg font-extrabold"}>{block.question}</h5>
                <div className={" flex gap-5 my-5"}>
                    <Button theme={ButtonThemes.FILLED} onClick={() => selectAnswerHandler("true")}
                        className={`!bg-green-800 !text-green-300 ${selectedAnswer === "true" && "!bg-green-300 !text-green-800"}`}
                    >True</Button>
                    <Button theme={ButtonThemes.FILLED} onClick={() => selectAnswerHandler("false")}
                        className={`!bg-red-800 !text-red-300 ${selectedAnswer === "false" && "!bg-red-300 !text-red-900"}`}
                    >False</Button>
                </div>
            </div>
            <div className={"flex justify-end w-full"}>

                <Button
                    theme={ButtonThemes.FILLED}
                    onClick={() => {
                        if (!isLast) {
                            handleAnswer(block?.answer.toLocaleLowerCase(), selectedAnswer);
                        } else if (isLast) {
                            handleAnswer(block?.answer.toLocaleLowerCase(), selectedAnswer);
                            submitHandler();
                        }
                    }}
                >
                    {isLast ? "Submit" : "Next question"}
                </Button>
            </div>
        </div>
    );
};

export default TrueFalseQuizGame;