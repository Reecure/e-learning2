import {FC} from "react";
import {Bar} from "react-chartjs-2";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
interface Props {
}

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

const ModuleProgress: FC<Props> = () => {

    return (
        <div className={"flex justify-center w-full min-h-[200px]  h-[310px]"}>
            <Bar options={options} data={{
                labels: ["Monday", "Tuesday", "Wednesday",  "Thursday", "Friday", "Saturday", "Sunday"],
                datasets: [
                    {
                        label: "Lessons",
                        barPercentage: 0.1,
                        data: [1, 2,4,0,2,3,10],
                        backgroundColor: "rgba(153, 102, 255, 1)",
                    }
                ],
            }} className={""}/>
        </div>
    );
};

export default ModuleProgress;