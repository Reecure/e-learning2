import {FC} from "react";
import {Label} from "@/shared/ui";
import {useFormContext} from "react-hook-form";

interface Props {
    index: number;
}

const TrueFalseQuizForm: FC<Props> = ({index}) => {
    const {register, formState: {errors}} = useFormContext();

    return (
        <div className={"flex flex-col gap-5 w-full"}>
            <h5 className={"text-2xl w-full font-bold text-blue-700 dark:text-blue-400"}>{index + 1}. True or False</h5>
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
            <div className={"flex gap-10"}>
                <Label htmlFor={`blocks.${index}.answer`} labelText={"True"}
                    textColor={"dark:!text-green-400 !text-green-600"}>
                    <input
                        type={"radio"}
                        value={"true"}
                        className={"inputField !border-green-600 dark:!border-green-400 "}
                        {...register(`blocks.${index}.answer`, {
                            required: {value: true, message: "Answer is required"},
                        })}
                    />
                </Label>
                <Label htmlFor={`blocks.${index}.answer`} labelText={"False"}
                    textColor={"dark:!text-red-400 !text-red-600"}>
                    <input
                        type={"radio"}
                        value={"false"}
                        className={"inputField !border-green-600 dark:!border-green-400 "}
                        {...register(`blocks.${index}.answer`, {
                            required: {value: true, message: "Answer is required"},
                        })}
                    />
                </Label>
            </div>
        </div>
    );
};

export default TrueFalseQuizForm;