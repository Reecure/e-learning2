import {type FC} from "react";
import {useFormContext} from "react-hook-form";
import {Label} from "@/shared/ui";

const CodeForm: FC<{ index: number }> = ({index}) => {
    const {register} = useFormContext();


    return (
        <div className={"flex flex-col gap-5 w-full"}>
            <h5 className={"text-2xl w-full font-bold text-blue-700 dark:text-blue-400"}>{index + 1}. Code Block</h5>
            <Label
                htmlFor={`blocks.${index}.code`}
                labelText={"Code"}
                textColor={"!text-light-primary-main dark:!text-dark-primary-main"}
            >
                {/* eslint-disable-next-line no-mixed-spaces-and-tabs */}
                <textarea id={"myTextarea"}
                    rows={3}
                    className={"inputField whitespace-pre-wrap resize-none"} {...register(`blocks.${index}.code`)}
                />
            </Label>
        </div>
    );
};

export default CodeForm;
