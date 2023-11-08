import React, {FC} from "react";
import {Loader} from "@/shared/ui";
import {trpc} from "@/shared/utils/trpc";
import CompleteLaterItem from "@/shared/ui/profile/ui/CompleteLater/CompleteLaterItem";

interface Props {
    user_id: string;
}

const CompleteLater: FC<Props> = ({user_id}) => {
    const user_read_later = trpc.progress.getUserReadLaterLessons.useQuery({user_id: user_id});

    if (user_read_later.isLoading) {
        return <Loader/>;
    }

    if (user_read_later.data?.length === 0) {
        return <div
            className={" flex justify-center items-center min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px] rounded-md border-dashed border-2 border-dark-primary-main"}>
            You have not lessons
        </div>;
    }

    return (
        <div
            className={"min-w-[250px] max-w-[470px] sm:w-[340px] h-[310px] border-[1px] border-dark-primary-container-hover/20 rounded-md flex flex-col gap-2 p-2 overflow-auto"}>
            {
                user_read_later.data?.map(item => {
                    return <div key={item.lesson_id}
                        className={"px-2 py-1 rounded-md w-full flex items-center justify-between odd:bg-dark-primary-main/30 even:bg-dark-primary-main/20"}>
                        <CompleteLaterItem lesson={item}/>
                    </div>;
                })
            }
        </div>
    );
};

export default CompleteLater;