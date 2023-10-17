import {type FC} from "react";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {Tabs} from "@/pages/user/my-courses/course/[id]";

type Props = {
    currentTab: Tabs;
    setCurrentTab: (currentTab: Tabs) => void;
};

const CourseTabs: FC<Props> = ({currentTab, setCurrentTab}) => (

    <div className={"flex flex-col relative w-full"}>
        <div className={"sm:hidden"}>
            <select className={"inputField max-w-[250px]"} onChange={e => {
                setCurrentTab(e.currentTarget.value as Tabs);
            }}>
                {
                    Object.values(Tabs).map(value => {
                        return <option key={value} className={"bg-light-background dark:bg-dark-background"} value={value}>
                            {value}
                        </option>;
                    })
                }
            </select>
        </div>
        <div className={"hidden sm:flex gap-3"}>
            {
                Object.values(Tabs).map(value => {
                    return  <div key={value}
                        className={`${
                            currentTab === value
                                ? "border-b-[4px] border-dark-primary-main z-[1] pb-2"
                                : ""
                        }`}
                    >
                        <Button
                            theme={ButtonThemes.TEXT}
                            onClick={() => {
                                setCurrentTab(value);
                            }}
                        >
                            {value}
                        </Button>
                    </div>;
                }) 
            }
        </div>
        <div
            className={
                "hidden sm:block w-full h-[1px] bg-dark-primary-main absolute bottom-[1px] left-0"
            }
        />
    </div>
);

export default CourseTabs;
