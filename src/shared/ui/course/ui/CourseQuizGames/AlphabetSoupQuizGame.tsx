import {FC, useState} from "react";
import {Button, ButtonThemes} from "@/shared/ui";
import {AlphabetSoupQuiz} from "@/enteties/Lesson";
import {shuffle} from "@/shared/helpers";

interface Props {
    block: AlphabetSoupQuiz;
    handleAnswer: (correct: string, userSelect: string) => void;
    isLast: boolean;
    submitHandler: () => void;
}


function shakeAndComplete(inputArray: string[]): string[] {
    const newArray = [...inputArray]; // Create a copy of the input array

    // Add random letters if the array length is less than 20
    while (newArray.length < 20) {
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter
        newArray.push(randomLetter);
    }

    return shuffle<string>(newArray);
}

const AlphabetSoupQuizGame: FC<Props> = ({submitHandler, isLast, block, handleAnswer}) => {

    const [answer, setAnswer] = useState<string[]>([]);
    const [letters, setLetters] = useState(shakeAndComplete(block.answer.split("")));

    const getLetterFromLetters = (index: number) => {
        setAnswer(prev => [...prev, letters[index]]);
        setLetters(letters.filter((value, i) => i !== index));
    };

    const getLetterFromAnswer = (index: number) => {
        setLetters(prev => [...prev, answer[index]]);
        setAnswer(answer.filter((value, i) => i !== index));
    };

    return (
        <div className={"w-full "}>
            <div className={"flex flex-col items-center"}>
                <h5 className={"text-lg font-extrabold"}>{block.question}</h5>
                <div className={"grid grid-cols-10 gap-2 my-5 max-h-10"}>
                    {answer.map((letter, i) => (
                        <div key={i} className={"px-2 py-1 bg-neutral-600 rounded-md cursor-pointer"}
                            onClick={() => getLetterFromAnswer(i)}>{letter}</div>
                    ))}
                </div>
                <div className={"grid grid-cols-10 gap-2 my-5"}>
                    {letters.map((letter, i) => (
                        <div key={i}
                            className={"flex items-center justify-center h-8 w-8 bg-neutral-600 rounded-md cursor-pointer"}
                            onClick={() => getLetterFromLetters(i)}>{letter}</div>
                    ))}
                </div>
            </div>
            <div className={"flex justify-end w-full"}>
                <Button
                    theme={ButtonThemes.FILLED}
                    onClick={() => {
                        if (!isLast) {
                            handleAnswer(block?.answer.toLocaleLowerCase(), answer.join(""));
                        } else if (isLast) {
                            handleAnswer(block?.answer.toLocaleLowerCase(), answer.join(""));
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

export default AlphabetSoupQuizGame;