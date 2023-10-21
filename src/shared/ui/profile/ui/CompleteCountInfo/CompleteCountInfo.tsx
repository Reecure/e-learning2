import {FC} from "react";

interface Props {
}

const CompleteCountInfo: FC<Props> = () => {

    return (
        <div className={"flex flex-col items-center justify-center gap-10 p-5 min-w-[200px] max-w-[340px] h-[310px] border-2 border-dark-primary-main rounded-md"}>
            <div className={"flex items-center"}>
                <span className={"text-2xl sm:text-4xl mr-3 text-dark-primary-main"}>10</span>
                <p className={"text-xl"}>Completed Courses</p>
            </div>
            <div className={"flex items-center"}>
                <span className={"text-2xl sm:text-4xl mr-3 text-dark-primary-main"}>500</span>
                <p className={"text-xl"}>Completed Modules</p>
            </div>
            <div className={"flex items-center"}>
                <span className={"text-2xl sm:text-4xl mr-3 text-dark-primary-main"}>2000</span>
                <p className={"text-xl"}>Completed Lessons</p>
            </div>
        </div>
    );
};

export default CompleteCountInfo;