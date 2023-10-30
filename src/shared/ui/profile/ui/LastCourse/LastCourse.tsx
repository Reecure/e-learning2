import {FC, useEffect} from "react";
import {trpc} from "@/shared/utils/trpc";
import {Loader, SmallCard} from "@/shared/ui";

interface Props {
    course_id: string
}

const LastCourse: FC<Props> = ({course_id}) => {
    if (course_id === "") {
        return <div className={"flex justify-center items-center min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px] rounded-md border-dashed border-2 border-dark-primary-main hover:border-dark-primary-main/30 hover:cursor-pointer duration-300"}>
            You don&apos;t visit courses yet
        </div>;
    }

    const courseQuery = trpc.course.courseById.useQuery({
        id: course_id
    });

    useEffect(() => {
        console.log(courseQuery.data);
    },[courseQuery.isLoading])

    if (courseQuery.isLoading){
        return  <div className={" flex justify-center items-center min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px] rounded-md border-dashed border-2 border-dark-primary-main hover:border-dark-primary-main/30 duration-300"}>
            <Loader />
        </div>;
    }

    return (
        <div className={"min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px"}>
            <SmallCard course={courseQuery.data} />
        </div>
    );
};

export default LastCourse;