import {type FC} from "react";
import DragAndDrop from "@/shared/ui/DragAndDrop/DragAndDrop";
import {trpc} from "@/shared/utils/trpc";
import {Loader} from "@/shared/ui";
import {ICourseModules} from "@/enteties/Course";

type Props = {
    courseId: string;
    courseModulesEdit: boolean;
    isUserAuthor: boolean;
};

const CourseModules: FC<Props> = ({
    courseId,
    courseModulesEdit,
    isUserAuthor,
}) => {
    const modulesQuery = trpc.course.courseById.useQuery({
        id: courseId,
    });

    if (modulesQuery.isLoading) {
        return <Loader/>;
    }

    return (
        <div className={"mt-5"}>
            <DragAndDrop
                items={modulesQuery.data?.modules as ICourseModules[]}
                canEdit={courseModulesEdit}
                isModule
                isUserAuthor={isUserAuthor}
            />
        </div>
    );
};

export default CourseModules;
