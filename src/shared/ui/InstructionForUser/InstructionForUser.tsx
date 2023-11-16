import {FC, useState} from "react";
import InstructionDescription from "@/shared/ui/InstructionForUser/InstructionDescription";

interface Props {
}

const currentTab = (tab: number, item: { title: string; paragraph: string[] }) => {
    switch (tab) {
    case 0:
        return <InstructionDescription key={tab} item={item}/>;
    case 1:
        return <InstructionDescription key={tab} item={item}/>;
    case 2:
        return <InstructionDescription key={tab} item={item}/>;
    case 3:
        return <InstructionDescription key={tab} item={item}/>;
    default:
        return <InstructionDescription key={tab} item={item}/>;
    }
};

interface Tab {
    id: number;
    title: string;
    description: {
        title: string
        paragraph: string[]
    };
}

const tabs: Tab[] = [
    {
        id: 0,
        title: "Create",
        description: {
            title: "How to create",
            paragraph: [
                "1. You should have role teacher",
                "2. If you have Role You can now Create course in profile page",
                "3. Just click and 'Create course'"
            ]
        }
    },
    {
        id: 1,
        title: "Study",
        description: {
            title: "How to study",
            paragraph: [
                "1. On page with courses you see all courses",
                "2. Just click on course and add to your collection of courses",
                "3. When you add you start check your statistic"
            ]
        }
    },
    {
        id: 2,
        title: "Statistic",
        description: {
            title: "What is statistic",
            paragraph: [
                "1. If course in your collection you have statistic",
                "2. When you click module or lesson you have statistic on this item",
                "3. Course have games with tasks when you complete you have score and check it on grades page"
            ]
        }
    },
    {
        id: 3,
        title: "Games",
        description: {
            title: "How to play",
            paragraph: [
                "1. Course can check your skills with tests",
                "2. Now course can have 2 games",
                "3. Dont worry if you have bad mark you can try again"
            ]
        }
    },
];


const InstructionForUser: FC<Props> = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const setTabHandler = (tab: number) => {
        setSelectedTab(tab);
    };

    return (
        <div className={"flex flex-col md:flex-row max-w-[250px] md:max-w-[500px]"}>
            <div
                className={"border-b-2 md:border-b-0 md:border-r-2 border-neutral-600 mb-3 md:mb-0 py-3 md:pr-10 md:py-10"}>
                <ul className={"flex md:flex-col justify-between md:gap-5"}>
                    {
                        tabs.map(tab => (
                            <li key={tab.id} className={"flex flex-col md:flex-row gap-2 items-center cursor-pointer"}
                                onClick={() => {
                                    setTabHandler(tab.id);
                                }}>
                                <p className={"rounded-full border-2 border-dark-primary-container px-[6px] text-xs md:text-sm"}>{tab.id + 1}</p>
                                <p className={"text-md md:text-xl text-light-neutral-300 dark:text-neutral-300"}>{tab.title}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={"px-5"}>
                {currentTab(selectedTab, tabs[selectedTab].description)}
            </div>

        </div>
    );
};

export default InstructionForUser;