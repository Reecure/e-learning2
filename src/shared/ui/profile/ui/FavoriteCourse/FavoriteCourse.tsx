import {FC} from "react";
import {Loader, SmallCard} from "@/shared/ui";
import {trpc} from "@/shared/utils/trpc";
import {Course} from "@/enteties/Course";

interface Props {
    course_id: string
}

const FavoriteCourse: FC<Props> = ({course_id}) => {

    if (course_id === "") {
        return <div className={" flex justify-center items-center min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px] rounded-md border-dashed border-2 border-dark-primary-main"}>
            You have not favorite course
        </div>;
    }

    const courseQuery = trpc.course.courseById.useQuery({
        id: course_id
    });

    if (courseQuery.isLoading){
        return  <div className={" flex justify-center items-center min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px] rounded-md border-dashed border-2 border-dark-primary-main"}>
            <Loader />
        </div>;
    }

    return (
        <div className={"min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px"}>
            <SmallCard course={courseQuery.data as Course} />
        </div>
    );
};

export default FavoriteCourse;