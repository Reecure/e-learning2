import React, {type FC, useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {trpc} from "@/shared/utils/trpc";
import SortableModuleItem from "./SortableModuleItem/SortableModuleItem";
import SortableLessonItem from "./SortableLessonItem/SortableLessonItem";
import {DeleteModal} from "@/shared/ui";
import {ModuleLesson} from "@/enteties/Module/model/types/module";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import {setPreviewVisible} from "@/shared/ui/course/model";
import {ICourseModules} from "@/enteties/Course";

type Props<T> = {
    item: T;
    disabled: boolean;
    isModule: boolean;
};

export const SortableModule: FC<Props<ModuleLesson | ICourseModules>> = ({
    item,
    disabled,
    isModule,
}) => {
    const utils = trpc.useContext();

    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

    const {attributes, listeners, setNodeRef, transform, transition}
        = useSortable({id: item?.id});
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const session = useSession();
    const dispatch = useAppDispatch();

    const deleteModule = trpc.module.delete.useMutation({ async onSuccess(){
        await utils.course.courseById.invalidate();

    }});
    const deleteLesson = trpc.lesson.delete.useMutation({ async onSuccess(){
        await utils.module.byId.invalidate();
        dispatch(setPreviewVisible(true));
    }});

    const router = useRouter();

    const deleteOpenHandler = () => {
        setDeleteIsOpen(prev => !prev);
    };

    const setNotificationOpenHandler = () => {
        setNotificationOpen(prev => !prev);
    };

    const deleteModuleHandler = () => {
        try {
            /* eslint-disable */
            // @ts-ignore
            deleteModule.mutate({id: item.module_id, course_id: router.query.id as string});
            deleteOpenHandler();
        } catch (e) {
            console.log(e);
        }
    };

    const deleteLessonHandler = () => {
        console.log("router.query.id", router.query.id);
        console.log("item.id", item.id);

        try {
            deleteLesson.mutate({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                id: item?.lesson_id,
                module_id: router.query.id as string || ""
            });
            deleteOpenHandler();
        } catch (e) {
            console.log(e);
        }

    };
    if (!item.is_visible && item.author_id !== session.data?.user.id) {
        return null;
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`mb-2  cursor-default touch-manipulation ${
                !disabled && "cursor-grab"
            } `}
        >
            {isModule ? (
            // Module
                <SortableModuleItem  item={item as ICourseModules} disabled={disabled}
                    deleteOpen={deleteOpenHandler}/>
            ) : (
            // Lesson
                <SortableLessonItem item={item as ModuleLesson} disabled={disabled}
                    deleteOpen={deleteOpenHandler}/>
            )}

            {/* {Delete modal} */}
            {
                isModule ? <DeleteModal deleteIsOpen={deleteIsOpen} deleteFunc={deleteModuleHandler}
                    deleteOpenHandler={deleteOpenHandler} itemName={item.title}
                    setNotificationOpen={setNotificationOpenHandler}/> :
                    <DeleteModal deleteIsOpen={deleteIsOpen} deleteFunc={deleteLessonHandler}
                        deleteOpenHandler={deleteOpenHandler} itemName={item.title}
                        setNotificationOpen={setNotificationOpenHandler}/>
            }
        </div>
    );
};
