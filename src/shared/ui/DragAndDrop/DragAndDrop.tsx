import {type FC, useEffect, useState} from "react";
import {
    closestCenter,
    DndContext,
    type DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {SortableModule} from "@/shared/ui/SortableItem/SortableModule";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";
import {ModuleLesson} from "@/enteties/Module/model/types/module";
import {useRouter} from "next/router";
import {ICourseModules} from "@/enteties/Course";

interface Props<T> {
    items: T[]
    canEdit: boolean
    isModule: boolean
    isUserAuthor: boolean
}

export const sortByOrder = <T extends { order: number }>(items: T[]): T[] => items.sort((a, b) => a.order - b.order);

const DragAndDrop: FC<Props<ModuleLesson | ICourseModules>> = ({
    canEdit,
    isUserAuthor,
    items,
    isModule,
}) => {
    const utils = trpc.useContext();
    const [propsItems, setPropsItems] = useState<Array<ModuleLesson | ICourseModules>>(items);
    const [orderChange, setOrderChange] = useState(false);

    const router = useRouter();

    const updateLessonOrder = trpc.lesson.updateOrder.useMutation({
        async onSuccess(){
            await utils.module.byId.invalidate();
        }});
    const updateModulesOrder = trpc.module.updateOrder.useMutation({
        async onSuccess(){
            await utils.module.byCourseId.invalidate();
        }
    });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    useEffect(() => {
        setPropsItems(items);
    }, [items, updateModulesOrder.isLoading, updateLessonOrder.isLoading]);

    useEffect(() => {
        propsItems.forEach((item, i) => (item.order = i));
    }, [propsItems]);

    useEffect(() => {
        setPropsItems(prevState => sortByOrder(prevState));
    }, [items, propsItems]);

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        if (active?.id !== over?.id) {
            setPropsItems(items => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over?.id);
                setOrderChange(true);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const saveLessons = async () => {
        await updateLessonOrder.mutate({
            id: router.query.id as string || "",
            lessons: propsItems
        });
    };

    const saveModules = async () => {
        await updateModulesOrder.mutate({
            id: router.query.id as string || "",
            modules: propsItems
        });
    };

    return (
        <div className={"mt-5"}>
            <div className={"flex justify-center mb-2"}>
                {isUserAuthor && canEdit && items.length > 1 && (isModule
                    ? (
                        <div className={"flex gap-5"}>
                            <Button
                                disabled={!orderChange}
                                theme={ButtonThemes.FILLED}
                                onClick={saveModules}
                            >
                                Save Order
                            </Button>
                        </div>

                    )
                    : (
                        <div className={"flex gap-5"}>
                            <Button
                                disabled={!orderChange}
                                theme={ButtonThemes.FILLED}
                                onClick={saveLessons}
                            >
                                Save Order
                            </Button>
                        </div>
                    ))}
            </div>
            {
                propsItems.length === 0 || propsItems === undefined
                    ? <div className={"w-full h-full"}>
                        <h3 className={"text-3xl"}>There are no lessons</h3>
                    </div>
                    : <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={propsItems}
                            strategy={verticalListSortingStrategy}
                            disabled={!canEdit}
                        >
                            {propsItems?.map(propsItem => (
                                <SortableModule
                                    disabled={!canEdit}
                                    key={propsItem.id}
                                    item={propsItem}
                                    isModule={isModule}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
            }
        </div>
    );
};

export default DragAndDrop;
