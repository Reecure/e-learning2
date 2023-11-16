import React, {FC} from "react";
import {useSession} from "next-auth/react";
import VisibilityChanger from "@/shared/ui/SortableItem/EditableSideComponents/VisibilityChanger/VisibilityChanger";
import DeleteSortableItem from "@/shared/ui/SortableItem/EditableSideComponents/DeleteSortableItem/DeleteSortableItem";
import ReadLaterToggler from "@/shared/ui/SortableItem/EditableSideComponents/ReadLaterToggler/ReadLaterToggler";

interface Props {
    author_id: string;
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
    read_later,
    author_id
}) => {

    const session = useSession();

    return (
        <div className={"flex flex-col"}>
            {
                session.data?.user.id === author_id && <>
                    <div className={"flex items-center justify-between"}>
                        Visibility
                        <VisibilityChanger
                            isVisible={is_visible}
                            visibilityLoading={visibilityLoading}
                            updateVisibleHandler={updateVisibleHandler}
                        />
                    </div>
                    <div className={"flex items-center justify-between"}>
                        Delete
                        <DeleteSortableItem deleteOpen={deleteOpen}/>
                    </div>
                </>
            }
            <div className={"flex items-center justify-between"}>
                Read Later
                <ReadLaterToggler
                    read_later_Loading={read_later_Loading}
                    read_later={read_later}
                    updateReadLaterHandler={updateReadLaterHandler}
                />
            </div>
        </div>
    );
};

export default LessonAuthorEditableSide;