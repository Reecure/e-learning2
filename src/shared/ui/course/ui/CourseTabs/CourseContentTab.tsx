import {type FC} from "react";
import CourseModules from "@/shared/ui/course/ui/CourseModules/CourseModules";

type Props = {
	courseModulesEdit: boolean;
    courseId: string;
	isUserAuthor: boolean;
};

const CourseContentTab: FC<Props> = ({
    courseModulesEdit,
    courseId,
    isUserAuthor,
}) => (
    <CourseModules
        courseModulesEdit={courseModulesEdit}
        courseId={courseId}
        isUserAuthor={isUserAuthor}
    />
);

export default CourseContentTab;
