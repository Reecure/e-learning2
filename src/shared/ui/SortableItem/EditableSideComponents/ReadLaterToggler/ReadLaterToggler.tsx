import React, {FC} from "react";
import {Button, ButtonThemes, Loader} from "@/shared/ui";
import {AiOutlineClockCircle} from "react-icons/ai";

interface Props {
    read_later_Loading: boolean;
    read_later: boolean;
    updateReadLaterHandler: () => void;
}

const ReadLaterToggler: FC<Props> = ({read_later_Loading, updateReadLaterHandler, read_later}) => {

    return (
        <>
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
        </>
    );
};

export default ReadLaterToggler;