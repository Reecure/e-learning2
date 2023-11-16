import React, {FC, useState} from "react";
import {Button, ButtonThemes} from "@/shared/ui";
import {BiEdit} from "react-icons/bi";
import {CourseModules} from "@/enteties/Course/model/types/course";
import VisibilityChanger from "@/shared/ui/SortableItem/EditableSideComponents/VisibilityChanger/VisibilityChanger";
import DeleteSortableItem from "@/shared/ui/SortableItem/EditableSideComponents/DeleteSortableItem/DeleteSortableItem";
import RenameModuleModal from "@/shared/ui/SortableItem/SortableModuleItem/RenameModuleModal/RenameModuleModal";

interface Props {
    item: CourseModules;
    visibilityLoading: boolean;
    updateVisibleHandler: () => void;
    deleteOpen: () => void;
}

const ModuleAuthorEditableSide: FC<Props> = ({
    updateVisibleHandler, item,
    deleteOpen, visibilityLoading
}) => {
    const [renameOpen, setRenameOpen] = useState(false);

    const renameOpenHandler = () => {
        setRenameOpen(prev => !prev);
    };

    return (
        <>
            <div className={"flex"}>
                <Button
                    type={"submit"}
                    theme={ButtonThemes.TEXT}
                    className={"!p-2 !rounded-md"}
                    onClick={renameOpenHandler}
                >
                    <BiEdit/>
                </Button>

                <VisibilityChanger
                    isVisible={item.is_visible}
                    visibilityLoading={visibilityLoading}
                    updateVisibleHandler={updateVisibleHandler}
                />
                <DeleteSortableItem deleteOpen={deleteOpen}/>
            </div>
            <RenameModuleModal
                item={item}
                renameOpen={renameOpen}
                renameOpenHandler={renameOpenHandler}/>
        </>
    );
};

export default ModuleAuthorEditableSide;