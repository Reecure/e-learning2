import React, {FC} from "react";
import {Button, ButtonThemes, Loader} from "@/shared/ui";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {BsTrash} from "react-icons/bs";

interface Props {
    visibilityLoading: boolean
    updateVisibleHandler: () => void
    is_visible: boolean
    deleteOpen: () => void

}

const LessonAuthorEditableSide: FC<Props> = ({deleteOpen, is_visible, visibilityLoading, updateVisibleHandler}) => {

    return (
        <div className={"flex items-center"}>
            <div>
                {
                    visibilityLoading ?
                        <span className={""}><Loader className={"!w-4 !h-4 "}/></span>
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
            <Button
                type={"submit"}
                className={"!text-light-error-main dark:!text-dark-error-main !p-1 sm:!p-2 !rounded-md"}
                theme={ButtonThemes.TEXT}
                onClick={deleteOpen}
            >
                <BsTrash/>
            </Button>
        </div>
    );
};

export default LessonAuthorEditableSide;