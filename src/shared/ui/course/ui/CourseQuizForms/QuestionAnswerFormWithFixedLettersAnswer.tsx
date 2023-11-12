import {type FC} from "react";
import {Label} from "@/shared/ui";
import {useFormContext} from "react-hook-form";

type Props = {
    index: number;
};

const QuestionAnswerFormWithFixedLettersAnswer: FC<Props> = ({index}) => {
    const {register, formState: {errors}} = useFormContext();

    return (
        <div className={"flex flex-col gap-5 w-full"}>
            <h5 className={"text-2xl w-full font-bold text-blue-400"}>{index + 1}. Answer with fixed letters</h5>
            <Label htmlFor={`blocks.${index}.question`} labelText={"Question"} textColor={"!text-dark-primary-main"}>
                <input
                    className={"inputField"}
                    {...register(`blocks.${index}.question`, {
                        required: {value: true, message: "Question is required"},
                        minLength: {value: 1, message: "Min length is 1 letter"},
                    })}
                />
            </Label>
            <Label htmlFor={`blocks.${index}.answer`} labelText={"Answer"} textColor={"!text-green-400 "}>
                <input
                    className={"inputField !border-green-400 "}
                    {...register(`blocks.${index}.answer`, {
                        required: {value: true, message: "Answer is required"},
                        minLength: {value: 1, message: "Min length is 1 letter"},
                    })}
                />
            </Label>
        </div>
    );
};

export default QuestionAnswerFormWithFixedLettersAnswer;

