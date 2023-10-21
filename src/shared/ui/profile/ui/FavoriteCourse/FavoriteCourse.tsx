import {FC} from "react";
import {SmallCard} from "@/shared/ui";
import {Course} from "@/enteties/Course";

interface Props {
    course: Course
}

const FavoriteCourse: FC<Props> = ({course}) => {

    return (
        <div className={"min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px"}>
            <SmallCard course={course} />
        </div>
    );
};

export default FavoriteCourse;