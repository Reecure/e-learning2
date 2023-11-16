import React, {FC} from "react";
import {Button, ButtonThemes} from "@/shared/ui";
import {BsTrash} from "react-icons/bs";

interface Props {
    deleteOpen: () => void;
}

const DeleteSortableItem: FC<Props> = ({deleteOpen}) => {

    return (
        <Button
            type={"submit"}
            theme={ButtonThemes.TEXT}
            className={"!text-light-error-main dark:!text-dark-error-main !p-2 !rounded-md"}
            onClick={deleteOpen}
        >
            <BsTrash/>
        </Button>
    );
};

export default DeleteSortableItem;