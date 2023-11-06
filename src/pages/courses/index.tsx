import {type ReactElement} from "react";
import {trpc} from "@/shared/utils/trpc";
import {SmallCard} from "@/shared/ui";
import Layout from "@/pages/layout";
import {type Course} from "@/enteties/Course";

const CoursesPage = () => {

    const visibleCourses = trpc.course.allVisible.useQuery();

    return (
        <div className={"p-3 sm:p-5 md:p-7 lg:p-10 xl:px-20 "}>
            <div className={"grid grid-cols-repeat-auto-custom gap-5"}>
                {visibleCourses.data?.map(course => <SmallCard key={course.id} course={course as Course}/>)}
            </div>
        </div>
    );
};

CoursesPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default CoursesPage;
