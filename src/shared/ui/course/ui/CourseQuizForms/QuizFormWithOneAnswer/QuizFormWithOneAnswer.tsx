import {FC} from "react";
import {useFormContext} from "react-hook-form";
import {Label} from "@/shared/ui";

interface Props {
    index: number;
    title: string;
}

const QuizFormWithOneAnswer: FC<Props> = ({index, title}) => {
    const {register, formState: {errors}} = useFormContext();

    return (
        <div className={"flex flex-col gap-5 w-full"}>
            <h5 className={"text-2xl w-full font-bold text-blue-700 dark:text-blue-400"}>{index + 1}. {title}</h5>
            <Label htmlFor={`blocks.${index}.question`} labelText={"Question"}
                textColor={"!text-light-primary-main dark:!text-dark-primary-main"}>
                <input
                    className={"inputField"}
                    {...register(`blocks.${index}.question`, {
                        required: {value: true, message: "Question is required"},
                        minLength: {value: 1, message: "Min length is 1 letter"},
                    })}
                />
            </Label>
            <Label htmlFor={`blocks.${index}.answer`} labelText={"Answer"}
                textColor={"dark:!text-green-400 !text-green-600"}>
                <input
                    className={"inputField dark:!text-green-400 !text-green-600"}
                    {...register(`blocks.${index}.answer`, {
                        required: {value: true, message: "Answer is required"},
                        minLength: {value: 1, message: "Min length is 1 letter"},
                    })}
                />
            </Label>
        </div>
    );
};

export default QuizFormWithOneAnswer;