import React, {FC} from "react";
import {trpc} from "@/shared/utils/trpc";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";


interface Props {
    user_id: string
}

const CompleteCountInfo: FC<Props> = ({user_id}) => {


    const counts = trpc.progress.getCompleteCount.useQuery({id: user_id});

    if (counts.isLoading) {
        return <Skeleton width={340} height={314}/>;
    }

    return (
        <div
            className={"flex flex-col gap-5 items-center justify-center min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px] border-2 border-dark-primary-main rounded-md"}>
            <div className={"flex gap-5 items-center justify-start"}>
                <p
                    className={"text-2xl sm:text-4xl text-dark-primary-main"}>{counts.data?.courses_progress_length}</p>
                <p className={"text-xl"}>Completed courses</p>
            </div>
            <div className={"ml-2 flex gap-5 items-center justify-start"}>
                <p
                    className={"text-2xl sm:text-4xl text-dark-primary-main"}>{counts.data?.modules_progress_length}</p>
                <p className={"text-xl"}>Completed modules</p>
            </div>
            <div className={"flex gap-5 items-center justify-start"}>
                <p
                    className={"text-2xl sm:text-4xl text-dark-primary-main"}>{counts.data?.lessons_progress_length}</p>
                <p className={"text-xl"}>Completed lessons</p>
            </div>
        </div>
    );
};

export default CompleteCountInfo;