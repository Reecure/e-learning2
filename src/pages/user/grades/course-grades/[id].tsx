import {ReactElement, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {Bar, Pie} from "react-chartjs-2";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from "chart.js";
import {trpc} from "@/shared/utils/trpc";
import {Button, Loader} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {LessonType} from "@/enteties/Lesson";
import {MdIncompleteCircle} from "react-icons/md";
import {BiSolidBarChartAlt2} from "react-icons/bi";
import {BsCalendarDate} from "react-icons/bs";
import Badge, {BadgeColors} from "../../../../shared/ui/Badge/Badge";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Your grades",
        },
    },
};
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {

};

const CourseGradesPage = () => {
    const [openModuleId, setOpenModuleId] = useState<string | null>(null);
    const session = useSession();
    const router = useRouter();

    const courseInfo = trpc.progress.getUserProgressOnCourse.useQuery({
        user_id: session.data?.user.id || "",
        course_id: router.query.id as string || ""
    });

    useEffect(() => {
        console.log(courseInfo.data?.lessonsProgress.lessonsProgress);
    }, [courseInfo.isLoading]);

    if (courseInfo.isLoading) {
        return <Loader/>;
    }

    if (courseInfo.error) {
        router.push("/404");
    }

    return (
        <>
            <div className={"flex justify-between bg-neutral-200 dark:bg-neutral-800 p-5 rounded-md"}>
                <div className={"flex flex-col justify-between"}>
                    <h3 className={"text-3xl font-extrabold"}>{courseInfo.data?.courseProgress.userProgress.course_name}</h3>
                    <div className={"grid grid-cols-2 gap-3"}>
                        <div className={"flex gap-1 items-center"}>
                            <BsCalendarDate/>
                            Start course at {courseInfo.data?.courseProgress.userProgress.start_course?.slice(0, 10)}
                        </div>
                        <div className={"flex gap-1 items-center"}>
                            <BiSolidBarChartAlt2 />
                            Avg quiz sccore: {courseInfo.data?.avg_score}
                        </div>
                        <div className={"flex gap-1 items-center"}>
                            <MdIncompleteCircle />
                            Completed modules: {courseInfo.data?.completed_modules}
                        </div>
                        <div className={"flex gap-1 items-center"}>
                            <MdIncompleteCircle />
                            Completed lessons: {courseInfo.data?.completed_lessons}
                        </div>
                    </div>
                </div>
                <div className={"w-[150px] h-[150px]"}>
                    <Pie data={
                        {
                            labels: ["completed", "uncompleted"],
                            datasets: [
                                {
                                    data: [100 - (courseInfo.data?.percentage || 0), courseInfo.data?.percentage],
                                    backgroundColor: [
                                        "#264949",
                                        "#68213c",
                                    ],
                                    borderColor: [
                                        "#49d269",
                                        "#e57165",
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }
                    }/>
                </div>
            </div>

            <div className={"mt-5"}>
                {courseInfo.data?.modulesProgress.modulesProgress.map(module => {
                    const isOpen = openModuleId === module.module_id;

                    return (
                        <div key={module.module_id} className={""}>
                            <div
                                className={"flex justify-between items-center px-2 py-3 w-full rounded-md  bg-dark-primary-container/50 mb-2"}>
                                <h6>{module.module_name}</h6>
                                <div className={"flex items-center"}>
                                    <div className={""}>{module.is_completed ?
                                        <Badge text={"completed"} color={BadgeColors.GREEN} className={"text-[12px] !mb-0"} />
                                        :
                                        <Badge text={"uncompleted"} color={BadgeColors.RED} className={"text-[12px] !mb-0"} />}</div>
                                    <Button
                                        theme={ButtonThemes.TEXT}
                                        className={"!px-2 !py-1 rounded-md"}
                                        onClick={() => setOpenModuleId(isOpen ? null : module.module_id)}
                                    >
                                        {isOpen ? "Close" : "Open"}
                                    </Button>
                                </div>
                            </div>
                            <div
                                className={`${isOpen ? "" : "hidden"} px-4 py-2 border-light-primary-main dark:border-dark-primary-main border-2 mb-2 rounded-md mt-1`}>
                                {courseInfo.data?.lessonsProgress.lessonsProgress
                                    .filter(lesson => lesson.lessonType === LessonType.QUIZ && lesson.module_id === module.real_module_id).length === 0 ?
                                    <div>You doesnt complete any Quiz lessons yet</div> :
                                    <Bar options={options} data={{
                                        labels: courseInfo.data?.lessonsProgress.lessonsProgress
                                            .filter(lesson => lesson.lessonType === LessonType.QUIZ && lesson.module_id === module.real_module_id)
                                            .map(les => les.lesson_name),
                                        datasets: [
                                            {
                                                label: "Grade",
                                                barPercentage: 0.1,
                                                data: courseInfo.data?.lessonsProgress.lessonsProgress
                                                    .filter(lesson => lesson.lessonType === LessonType.QUIZ && lesson.module_id === module.real_module_id)
                                                    .map(les => les.quizScore),
                                                backgroundColor: "rgba(153, 102, 255, 1)",
                                            }
                                        ],
                                    }} className={"max-w-[500px] max-h-[200px]"}/>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

CourseGradesPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>{page}</UserLayout>
        </Layout>
    );
};


export default CourseGradesPage;