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
        <div className={"w-[520px] h-[230px] border-2 rounded-md border-dark-primary-main px-5"}>
            <Bar options={options} data={{
                labels: ["Lesson 1", "Lesson 2", "Lesson 3",  "Lesson 4", "Lesson 5"],
                datasets: [
                    {
                        label: "Grade",
                        barPercentage: 0.1,
                        data: [2,4,3, 4,5],
                        backgroundColor: "rgba(153, 102, 255, 1)",
                    }
                ],
            }} className={"max-w-[500px] max-h-[200px]"}/>
        </div>
    );
};

export default ModuleProgress;