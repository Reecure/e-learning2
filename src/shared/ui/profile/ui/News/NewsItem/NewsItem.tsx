import React, {FC, useState} from "react";
import {News} from "@/enteties/News/model/types/module";
import {Button, ButtonThemes} from "@/shared/ui";
import {AiOutlineDown} from "react-icons/ai";

interface Props {
    className?: string;
    item: News;
}

const NewsItem: FC<Props> = ({className, item}) => {

    const [descriptionOpen, setDescriptionOpen] = useState(false);

    const openDescriptionHandler = () => {
        setDescriptionOpen(prev => !prev);
    };

    return (
        <div className={`${className} w-full rounded-md px-2 py-4 mb-2`}>
            <div className={"flex justify-between items-center "}>
                <p className={"text-xl font-medium "}>{item.title}</p>
                <Button
                    type={"submit"}
                    className={`!p-1 sm:!p-2 !rounded-md ${descriptionOpen && "rotate-0"} duration-300`}
                    theme={ButtonThemes.TEXT}
                    onClick={openDescriptionHandler}
                >
                    <AiOutlineDown/>
                </Button>
            </div>
            {
                descriptionOpen && <div>
                    <p className={"text-black/80 dark:text-neutral-300 text-md mt-3"}>{item.description}</p>
                </div>
            }
        </div>
    );
};

export default NewsItem;