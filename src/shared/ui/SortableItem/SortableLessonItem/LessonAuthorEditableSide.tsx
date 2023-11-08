import React, {FC, useEffect} from "react";
import {Button, ButtonThemes, Loader} from "@/shared/ui";
import {AiFillEye, AiFillEyeInvisible, AiOutlineClockCircle} from "react-icons/ai";
import {BsTrash} from "react-icons/bs";

interface Props {
    visibilityLoading: boolean;
    updateVisibleHandler: () => void;
    is_visible: boolean;
    deleteOpen: () => void;
    read_later_Loading: boolean;
    read_later: boolean;
    updateReadLaterHandler: () => void;
}

const LessonAuthorEditableSide: FC<Props> = ({
    read_later_Loading,
    deleteOpen,
    is_visible,
    visibilityLoading,
    updateVisibleHandler,
    updateReadLaterHandler,
    read_later
}) => {

    useEffect(() => {
        console.log(read_later);
    }, [updateReadLaterHandler]);

    return (
        <div className={"flex flex-col"}>
            <div className={"flex items-center justify-between"}>
                Visibility
                {
                    visibilityLoading ?
                        <span className={"!p-1 sm:!p-2"}><Loader className={"!w-[14px] !h-[14px] "}/></span>
                        : <Button
                            type={"submit"}
                            className={"!p-1 sm:!p-2 !rounded-md"}
                            theme={ButtonThemes.TEXT}
                            onClick={updateVisibleHandler}
                        >
                            {is_visible ? <AiFillEye/> : <AiFillEyeInvisible/>}
                        </Button>
                }
            </div>
            <div className={"flex items-center justify-between"}>
                Read Later
                {
                    read_later_Loading ?
                        <span className={"!p-1 sm:!p-2"}><Loader className={"!w-[14px] !h-[14px]"}/></span> :
                        <Button
                            type={"submit"}
                            className={`!p-1 sm:!p-2 !rounded-md ${read_later ? "!text-green-300" : "!text-red-700"}`}
                            theme={ButtonThemes.TEXT}
                            onClick={updateReadLaterHandler}
                        >
                            <AiOutlineClockCircle/>
                        </Button>
                }
            </div>
            <div className={"flex items-center justify-between"}>
                Delete
                <Button
                    type={"submit"}
                    className={"!text-light-error-main dark:!text-dark-error-main !p-1 sm:!p-2 !rounded-md"}
                    theme={ButtonThemes.TEXT}
                    onClick={deleteOpen}
                >
                    <BsTrash/>
                </Button>
            </div>
        </div>
    );
};

export default LessonAuthorEditableSide;