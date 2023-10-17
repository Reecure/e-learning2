import React, {type FC, useEffect, useState} from "react";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import {type Module} from "@/enteties/Module";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {setPreviewVisible} from "@/shared/ui/course/model";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import ModuleAuthorEditableSide from "@/shared/ui/SortableItem/SortableModuleItem/ModuleAuthorEditableSide";

type Props = {
    item: Module;
    disabled: boolean;
    deleteOpen: () => void;
};

const SortableModuleItem: FC<Props> = ({item, disabled, deleteOpen}) => {
    const utils = trpc.useContext();
    const [visibilityLoading, setVisibilityLoading] = useState(false);
    const session = useSession();

    const updateModuleProgress = trpc.progress.updateUserModulesProgress.useMutation();
    const updateModuleVisibility = trpc.module.updateVisibility.useMutation({
        async onSuccess() {
            await utils.module.byCourseId.invalidate();
        }
    });


    const dispatch = useAppDispatch();

    useEffect(() => {
        if (updateModuleVisibility.status === "loading") {
            setVisibilityLoading(true);
        } else {
            setVisibilityLoading(false);
        }
    }, [updateModuleVisibility.isLoading]);

    const updateVisibleHandler = () => {
        try {
            updateModuleVisibility.mutate({
                id: item.id,
                is_visible: !item.is_visible
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={"flex justify-between items-center"}>
            {disabled ? (
                <Link
                    href={`${Routes.USER_COURSE_PAGE_LESSONS}/${item.id}`}
                    className={"cursor-pointer "}
                    onClick={() => {
                        dispatch(setPreviewVisible(true));
                        updateModuleProgress.mutate({
                            id: session.data?.user.id || "",
                            module_progress: {
                                module_id: item.id,
                                course_id: item.course_id,
                                module_name: item.title,
                                is_completed: true,
                            },
                        });
                    }}
                >
                    {item.title}
                </Link>
            ) : (
                <p>{item.title}</p>
            )}
            {session.data?.user.id === item.author_id && disabled && <ModuleAuthorEditableSide
                item={item}
                visibilityLoading={visibilityLoading} updateVisibleHandler={updateVisibleHandler}
                deleteOpen={deleteOpen}/>}
        </div>
    );
};

export default SortableModuleItem;
