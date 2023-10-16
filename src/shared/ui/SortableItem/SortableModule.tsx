import React, {type FC, useEffect, useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {type Module} from "@/enteties/Module";
import {trpc} from "@/shared/utils/trpc";
import SortableModuleItem from "./SortableModuleItem/SortableModuleItem";
import SortableLessonItem from "./SortableLessonItem/SortableLessonItem";
import {DeleteModal} from "@/shared/ui";
import {ModuleLesson} from "@/enteties/Module/model/types/module";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

type Props<T> = {
    item: T;
    disabled: boolean;
    isModule: boolean;
    refetch: () => void;
};

export const SortableModule: FC<Props<ModuleLesson | Module>> = ({
	item,
	disabled,
	isModule,
	refetch,
}) => {
	const [deleteIsOpen, setDeleteIsOpen] = useState(false);
	const [notificationOpen, setNotificationOpen] = useState(false);
	const {attributes, listeners, setNodeRef, transform, transition}
        = useSortable({id: item?.id});
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const session = useSession();

	const deleteModule = trpc.deleteModule.useMutation();
	const deleteLesson = trpc.deleteLesson.useMutation();

	const router = useRouter();

	useEffect(() => {
		refetch();
	}, [deleteModule.isLoading, deleteLesson.isLoading]);


	const deleteOpenHandler = () => {
		setDeleteIsOpen(prev => !prev);
	};

	const setNotificationOpenHandler = () => {
		setNotificationOpen(prev => !prev);
	};

	const deleteModuleHandler = () => {
		try {
			deleteModule.mutate({id: item.id});
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
			className={`px-2 py-3 w-full border-2 border-light-primary-main dark:border-dark-primary-main rounded-md mb-2  cursor-default touch-manipulation ${
				!disabled && "cursor-grab"
			} `}
		>
			{isModule ? (
			// Module
				<SortableModuleItem refetch={refetch} item={item as Module} disabled={disabled}
					deleteOpen={deleteOpenHandler}/>
			) : (
			// Lesson
				<SortableLessonItem refetch={refetch} item={item as ModuleLesson} disabled={disabled}
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
