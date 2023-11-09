import {FC, useEffect} from "react";
import {Bar} from "react-chartjs-2";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {trpc} from "@/shared/utils/trpc";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
interface Props {
    user_id: string
}

export const options = {
    responsive: true,
    plugins: {
    },
};
ChartJS.register(ArcElement, Tooltip, Legend);

const WeekProgress: FC<Props> = ({user_id}) => {

    const last7dayLesson = trpc.progress.getLast7DaysLesson.useQuery({id: user_id});

    useEffect(() => {
        console.log(last7dayLesson.data);
    }, [last7dayLesson.isLoading]);

    if (last7dayLesson.isLoading) {
        return <Skeleton height={310}/>;
    }

    return (
        <div className={"flex justify-center w-full min-h-[200px]  h-[310px]"}>
            <Bar options={options} data={{
                labels: last7dayLesson.data?.map(lesson => {
                    return `${lesson.date.getDate()}/${lesson.date.getMonth() + 1}`;
                }),
                datasets: [
                    {
                        label: "Lessons Complete",
                        barPercentage: 0.3,
                        minBarLength: 4,
                        data: last7dayLesson.data?.map(lesson => lesson.lessonCount),
                        backgroundColor: "rgba(153, 102, 255, 1)",
                    }
                ],
            }} className={""}/>
        </div>
    );
};

export default WeekProgress;