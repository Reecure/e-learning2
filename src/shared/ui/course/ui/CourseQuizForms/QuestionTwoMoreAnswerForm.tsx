import {FC} from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {Button, ButtonThemes, Label} from "@/shared/ui";
import {AiOutlineClose} from "react-icons/ai";

interface Props {
    index: number;
}

const QuestionTwoMoreAnswerForm: FC<Props> = ({index}) => {
    const {register, control} = useFormContext();
    const {
        fields: correctAnswerFields,
        remove: removeCorrectAnswer,
        append: appendCorrectAnswer,
    } = useFieldArray({
        control,
        name: `blocks.${index}.correctAnswer`,
    });

    const {
        fields: incorrectAnswerFields,
        remove: removeIncorrectAnswer,
        append: appendIncorrectAnswer,
    } = useFieldArray({
        control,
        name: `blocks.${index}.answer`,
    });

    const appendCorrectAnswerField = () => {
        appendCorrectAnswer({otherCorrectAnswer: ""});
    };

    const appendIncorrectAnswerField = () => {
        appendIncorrectAnswer({otherAnswer: ""});
    };

    return (
        <div className={"flex flex-col gap-5 w-full"}>
            <h5 className={"text-2xl w-full font-bold text-blue-700 dark:text-blue-400"}>
                {index + 1}. Question Two More Answer Block
            </h5>
            <Label htmlFor={`blocks.${index}.question`} labelText={"Question"}
                textColor={"!text-light-primary-main dark:!text-dark-primary-main"}
            >
                <input
                    className={"inputField"}
                    {...register(`blocks.${index}.question`, {
                        required: {value: true, message: "Question is required"},
                        minLength: {value: 1, message: "Min length is 1 letter"},
                    })}
                />
            </Label>
            {correctAnswerFields.map((field, otherAnswerIndex) => (
                <div key={field.id} className={"flex gap-2 items-start"}>
                    <div className={"w-full"}>
                        <Label
                            htmlFor={`blocks.${index}.correctAnswer.${otherAnswerIndex}.otherCorrectAnswer`}
                            labelText={"Correct Answer"}
                            textColor={"!text-green-400 dark:!text-green-400"}
                        >
                            <input
                                className={"inputField w-full dark:!border-green-400 !border-green-600"}
                                {...register(
                                    `blocks.${index}.correctAnswer.${otherAnswerIndex}.otherCorrectAnswer`,
                                    {
                                        required: {value: true, message: "Correct Answer is required"},
                                        minLength: {value: 1, message: "Min length is 1 letter"},
                                    }
                                )}
                            />
                        </Label>
                    </div>
                    <Button
                        theme={ButtonThemes.TEXT}
                        type="button"
                        className={"!p-1  rounded-md"}
                        onClick={() => {
                            removeCorrectAnswer(otherAnswerIndex);
                        }}
                    >
                        <AiOutlineClose/>
                    </Button>
                </div>
            ))}
            <Button type={"button"} theme={ButtonThemes.FILLED} onClick={appendCorrectAnswerField}>
                Add Correct Answer
            </Button>
            {incorrectAnswerFields.map((field, otherAnswerIndex) => (
                <div key={field.id} className={"flex gap-2 items-start"}>
                    <div className={"w-full"}>
                        <Label
                            htmlFor={`blocks.${index}.answer.${otherAnswerIndex}.otherAnswer`}
                            labelText={"Incorrect Answer"}
                            textColor={"!text-red-400 dark:!text-red-400"}
                        >
                            <input
                                className={"inputField w-full dark:!border-red-400 !border-red-600"}
                                {...register(
                                    `blocks.${index}.answer.${otherAnswerIndex}.otherAnswer`,
                                    {
                                        required: {value: true, message: "Incorrect Answer is required"},
                                        minLength: {value: 1, message: "Min length is 1 letter"},
                                    }
                                )}
                            />
                        </Label>
                    </div>
                    <Button
                        theme={ButtonThemes.TEXT}
                        type="button"
                        className={"!p-1  rounded-md"}
                        onClick={() => {
                            removeIncorrectAnswer(otherAnswerIndex);
                        }}
                    >
                        <AiOutlineClose/>
                    </Button>
                </div>
            ))}
            <Button type={"button"} theme={ButtonThemes.FILLED} onClick={appendIncorrectAnswerField}>
                Add Incorrect Answer
            </Button>
        </div>
    );
};

export default QuestionTwoMoreAnswerForm;
