import React, {FC} from "react";
import {trpc} from "@/shared/utils/trpc";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import {SmallCard} from "@/shared/ui";
import {Course} from "@/enteties/Course";
import StubText from "@/shared/ui/StubText/StubText";

interface Props {
    course_id: string;
}

const FavoriteCourse: FC<Props> = ({course_id}) => {

    if (course_id === "") {
        return <div
            className={"flex flex-col justify-center items-center min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px] rounded-md border-dashed border-2 border-dark-primary-main"}>
            <StubText title={`You haven't favorite course`} linkText={"Find your perfect course!"}/>

        </div>;
    }

    const courseQuery = trpc.course.courseById.useQuery({
        id: course_id
    });

    if (courseQuery.isLoading){
        return <Skeleton width={340} height={310}/>;
    }

    return (
        <div className={"min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px"}>
            <SmallCard course={courseQuery.data as Course} />
        </div>
    );
};

export default FavoriteCourse;