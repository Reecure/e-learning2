import {type FC, useEffect} from "react";
import {trpc} from "@/shared/utils/trpc";
import DragAndDrop from "@/shared/ui/DragAndDrop/DragAndDrop";
import {Loader} from "@/shared/ui";
import {ModuleLesson} from "@/enteties/Module/model/types/module";

type Props = {
    moduleId: string;
    lessonCanEdit: boolean;
    isUserLessons: boolean;
};

const CourseLessons: FC<Props> = ({
    moduleId,
    lessonCanEdit,
    isUserLessons,
}) => {
    const lessonsQuery = trpc.module.byId.useQuery({
        id: moduleId,
    });

    useEffect(()=>{
        console.log(lessonsQuery.data?.lessons);
    },[lessonsQuery.isLoading]);

    if (lessonsQuery.isLoading) {
        return <Loader/>;
    }

    return (
        <div className={"mt-5"}>
            <DragAndDrop
                items={lessonsQuery.data?.lessons as ModuleLesson[]}
                canEdit={lessonCanEdit}
                isModule={false}
                isUserAuthor={isUserLessons}
            />
        </div>
    );
};

export default CourseLessons;
