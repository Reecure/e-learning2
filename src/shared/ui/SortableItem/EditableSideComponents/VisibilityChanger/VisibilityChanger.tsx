import React, {FC} from "react";
import {Button, ButtonThemes, Loader} from "@/shared/ui";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

interface Props {
    isVisible: boolean;
    visibilityLoading: boolean;
    updateVisibleHandler: () => void;

}

const VisibilityChanger: FC<Props> = ({isVisible, visibilityLoading, updateVisibleHandler}) => {
    return (
        <>
            {
                visibilityLoading ?
                    <span className={""}><Loader className={"!w-4 !h-4 "}/></span>
                    : <Button
                        type={"submit"}
                        className={"!p-1 sm:!p-2 !rounded-md"}
                        theme={ButtonThemes.TEXT}
                        onClick={updateVisibleHandler}
                    >
                        {isVisible ? <AiFillEye/> : <AiFillEyeInvisible/>}
                    </Button>
            }
        </>
    );
};

export default VisibilityChanger;