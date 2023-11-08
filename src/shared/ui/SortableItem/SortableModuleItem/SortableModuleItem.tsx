import React, {type FC, useEffect, useState} from "react";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {setPreviewVisible} from "@/shared/ui/course/model";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import ModuleAuthorEditableSide from "@/shared/ui/SortableItem/SortableModuleItem/ModuleAuthorEditableSide";
import {ICourseModules} from "@/enteties/Course";
import {useRouter} from "next/router";
import {Button, ButtonThemes, Loader} from "@/shared/ui";
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";

type Props = {
    item: ICourseModules;
    disabled: boolean;
    deleteOpen: () => void;
};

const SortableModuleItem: FC<Props> = ({item, disabled, deleteOpen}) => {
    const utils = trpc.useContext();

    const [progressLoading, setProgressLoading] = useState(false);
    const [visibilityLoading, setVisibilityLoading] = useState(false);

    const session = useSession();
    const router = useRouter();

    const checkOnComplete = trpc.progress.updateIsCompletedCourse.useMutation();

    const updateModuleProgress = trpc.progress.updateUserModulesProgress.useMutation(
        {
            async onSuccess() {
                await utils.progress.getUserModulesProgressById.invalidate();
                await checkOnComplete.mutate({
                    course_id: router.query.id as string,
                    user_id: session.data?.user.id || ""
                });
            }
        }
    );

    const userProgressOnModule = trpc.progress.getUserModulesProgressById.useQuery({
        id: session.data?.user.id || "",
        module_id: item.id,
    });

    const updateModuleVisibility = trpc.module.updateVisibility.useMutation({
        async onSuccess() {
            await utils.course.courseById.invalidate();
        }
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (updateModuleProgress.status === "loading") {
            setProgressLoading(true);
        } else {
            setProgressLoading(false);
        }
    }, [updateModuleProgress.isLoading]);

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
                course_id: router.query.id as string,
                is_visible: !item.is_visible
            });
        } catch (e) {
            console.log(e);
        }
    };

    const setIsCompletedHandler = async () => {
        try {
            await updateModuleProgress.mutate({
                id: session.data?.user.id || "",
                module_progress: {
                    real_module_id: item.module_id,
                    module_id: item.id,
                    course_id: router.query.id as string,
                    module_name: item.title,
                    is_completed: userProgressOnModule && userProgressOnModule.data?.is_completed !== true || false,
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={"flex justify-between items-center px-2 py-3 w-full rounded-md  bg-dark-primary-container/50"}>
            {disabled ? (
                <Link
                    href={`${Routes.USER_COURSE_PAGE_LESSONS}/${item.module_id}`}
                    className={"cursor-pointer text-neutral-100"}
                    onClick={() => {
                        dispatch(setPreviewVisible(true));
                        updateModuleProgress.mutate({
                            id: session.data?.user.id || "",
                            module_progress: {
                                real_module_id: item.module_id,
                                module_id: item.id,
                                course_id: router.query.id as string,
                                module_name: item.title,
                                is_completed: userProgressOnModule && userProgressOnModule.data?.is_completed || false,
                            }
                        });
                    }}
                >
                    {item.title}
                </Link>
            ) : (
                <p>{item.title}</p>
            )}

            <div className={"flex items-center"}>
                {disabled && (
                    progressLoading ? <span className={"!p-1"}><Loader className={"!w-4 !h-4 "}/></span>
                        : <Button
                            type={"submit"}

                            className={`${
                                userProgressOnModule.data?.is_completed
                                    ? "!text-light-error-main dark:!text-dark-error-main"
                                    : "!text-green-600"
                            } ${progressLoading ? "!p-1 sm:!p-2 pointer-events-none !hover:none" : "!p-1 sm:!p-2"} !rounded-md`}
                            theme={ButtonThemes.TEXT}
                            onClick={() => {
                                setIsCompletedHandler();
                            }}

                        >
                            <>
                                {userProgressOnModule.data?.is_completed ? (
                                    <AiOutlineClose/>
                                ) : (
                                    <AiOutlineCheck/>
                                )}
                            </>
                        </Button>
                )}
                {session.data?.user.id === item.author_id && disabled && <ModuleAuthorEditableSide
                    item={item}
                    visibilityLoading={visibilityLoading} updateVisibleHandler={updateVisibleHandler}
                    deleteOpen={deleteOpen}/>}
            </div>
        </div>
    );
};

export default SortableModuleItem;
