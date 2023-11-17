import {FC, useState} from "react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {v4 as uuidv4} from "uuid";
import {Button, ButtonThemes, Label} from "@/shared/ui";
import {AiOutlineClose} from "react-icons/ai";

interface Props {
    index: number;
}

const ListForm: FC<Props> = ({index}) => {
    const [showTitle, setShowTitle] = useState(true);
    const {register, control, setValue} = useFormContext();
    const {
        fields,
        remove,
        append: appendListItem,
    } = useFieldArray({
        control,
        name: `blocks.${index}.listItems`,
    });

    const appendEmptyParagraph = () => {
        appendListItem({id: uuidv4(), item: ""});
    };

    return (
        <div className={"flex flex-col gap-5 w-full"}>
            <h5 className={"text-2xl w-full font-bold text-blue-700 dark:text-blue-400"}>{index + 1}. List Block</h5>
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

            {fields.map((field, itemIndex) => (
                <div key={field.id} className={"flex gap-2 items-start"}>
                    <input
                        className={"inputField"}
                        {...register(`blocks.${index}.listItems.${itemIndex}.item`)}
                    />
                    <Button
                        theme={ButtonThemes.TEXT}
                        className={"!p-1 rounded-md"}
                        type="button"
                        onClick={() => {
                            remove(itemIndex);
                        }}
                    >
                        <AiOutlineClose/>
                    </Button>
                </div>
            ))}
            <Button theme={ButtonThemes.FILLED} onClick={appendEmptyParagraph}>
                Add list item
            </Button>
        </div>
    );
};

export default ListForm;