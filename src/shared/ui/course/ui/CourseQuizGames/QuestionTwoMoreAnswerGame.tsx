import {ChangeEvent, FC, useEffect, useState} from "react";
import {QuestionTwoMoreAnswerQuiz} from "@/enteties/Lesson";
import {Button, ButtonThemes} from "@/shared/ui";
import {shuffle} from "@/shared/helpers";


interface Props {
    block: QuestionTwoMoreAnswerQuiz;
    handleAnswer: (correct: string, userSelect: string) => void;
    isLast: boolean;
    submitHandler: () => void;
}

const arraysEqual = (arr1: string[], arr2: string[]) =>
    arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);


const QuestionTwoMoreAnswerGame: FC<Props> = ({handleAnswer, submitHandler, isLast, block}) => {

    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [result, setResult] = useState("false");
    const [answers, setAnswers] = useState<string[]>([]);

    useEffect(() => {
        const updatedAnswers: string[] = [];

        block.correctAnswer.forEach((item) => {
            updatedAnswers.push(item.otherCorrectAnswer);
        });

        block.answer.forEach((item) => {
            updatedAnswers.push(item.otherAnswer);
        });

        setAnswers(shuffle<string>(updatedAnswers));
    }, [block.correctAnswer, block.answer]);

    useEffect(() => {
        const updatedAnswers: string[] = [];
        block.correctAnswer.forEach((item) => {
            updatedAnswers.push(item.otherCorrectAnswer);
        });
        if (arraysEqual(updatedAnswers.sort(), selectedAnswers.sort())) {
            setResult("true");
        } else {
            setResult("false");
        }
    }, [selectedAnswers, block.correctAnswer]);

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, item: string) => {
        const isChecked = e.target.checked;

        if (isChecked) {
            setSelectedAnswers((prevSelected) => [...prevSelected, item]);
        } else {
            setSelectedAnswers((prevSelected) =>
                prevSelected.filter((selectedItem) => selectedItem !== item)
            );
        }

    };

    return (
        <div className={"w-full "}>
            <div className={""}>
                <h5 className={"text-lg font-extrabold mb-3"}>{block.question}</h5>
                <ul className={"flex flex-col gap-2 mb-5"}>
                    {
                        answers.map((item, i) => (
                            <li key={i} className={"flex gap-2 items-center"}>
                                {i + 1}.
                                <input type="checkbox" id={`react-option${i}`} value="" className="hidden peer"
                                    checked={selectedAnswers.includes(item)}
                                    onChange={(e) => handleCheckboxChange(e, item)}
                                />
                                <label htmlFor={`react-option${i}`}
                                    className="w-full p-2 rounded-md
                                    bg-light-primary-main/10 dark:bg-dark-primary-main/10
                                    lg:dark:hover:!bg-dark-primary-main/30
                                    peer-checked:bg-light-primary-main/30 dark:peer-checked:dark:bg-dark-primary-main/30
                                    dark:hover:bg-gray-700">
                                    <div className="block">
                                        {item}
                                    </div>
                                </label>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={"flex justify-end w-full"}>

                <Button
                    theme={ButtonThemes.FILLED}
                    onClick={() => {
                        if (!isLast) {
                            handleAnswer("true", result);
                        } else if (isLast) {
                            handleAnswer("true", result);
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

export default QuestionTwoMoreAnswerGame;