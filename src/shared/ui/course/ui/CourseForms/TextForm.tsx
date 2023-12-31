import {type FC, useState} from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {v4 as uuidv4} from "uuid";
import {Button, ButtonThemes, Label} from "@/shared/ui";
import {ITextBlock} from "@/enteties/Lesson";
import {AiOutlineClose} from "react-icons/ai";

const TextForm: FC<{ index: number; initFields?: ITextBlock }> = ({index}) => {
    const [showTitle, setShowTitle] = useState(true);
    const {register, control, setValue} = useFormContext();
    const {
        fields,
        remove,
        append: appendParagraph,
    } = useFieldArray({
        control,
        name: `blocks.${index}.paragraphs`,
    });

    const appendEmptyParagraph = () => {
        appendParagraph({id: uuidv4(), text: ""});
    };

    return (
        <div className={"flex flex-col gap-5 w-full"}>
            <h5 className={"text-2xl w-full font-bold text-blue-700 dark:text-blue-400"}>{index + 1}. Text Block</h5>
            <div className={"flex items-start w-full"}>
                {
                    showTitle &&
                    <Label htmlFor={`blocks.${index}.title`}
                        labelText={"Title"}
                        textColor={"!text-light-primary-main dark:!text-dark-primary-main"}
                    >
                        <input
                            className={"inputField"}
                            {...register(`blocks.${index}.title`, {
                                required: {value: true, message: "Title is required"},
                                minLength: {value: 1, message: "Min length is 1 letter"},
                            })}
                        />
                    </Label>
                }
                <Button
                    theme={ButtonThemes.TEXT}
                    className={`${showTitle ? "!p-1" : "!py-2 !px-3"} rounded-md`}
                    type="button"
                    onClick={() => {
                        setValue(`blocks.${index}.title`, "");
                        setShowTitle(prevState => !prevState);
                    }}
                >
                    {showTitle ? <AiOutlineClose/> : "Show title"}
                </Button>
            </div>

            {fields.map((field, paragraphIndex) => (
                <div key={field.id} className={"flex gap-2 items-start"}>
                    <textarea
                        rows={3}
                        className={"inputField resize-none"}
                        {...register(`blocks.${index}.paragraphs.${paragraphIndex}.text`)}
                    />
                    <Button
                        theme={ButtonThemes.TEXT}
                        className={"!p-1 rounded-md"}
                        type="button"
                        onClick={() => {
                            remove(paragraphIndex);
                        }}
                    >
                        <AiOutlineClose/>
                    </Button>
                </div>
            ))}
            <Button theme={ButtonThemes.FILLED} onClick={appendEmptyParagraph}>
                Add paragraph
            </Button>
        </div>
    );
};

export default TextForm;
