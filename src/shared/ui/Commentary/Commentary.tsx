import {FC} from "react";
import {Review} from "@/enteties/Review";
import {trpc} from "@/shared/utils/trpc";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";

interface Props {
    info: Review;
}

const Commentary: FC<Props> = ({info}) => {

    const userInfo = trpc.user.userById.useQuery({id: info.user_id});

    if (userInfo.isLoading) {
        return <Skeleton height={50}/>;
    }

    return (
        <div data-testid={"commentary"}
            className={"w-full px-5 py-2 rounded-md border-2 border-light-primary-main dark:border-dark-primary-main"}>
            <p className={"text-md text-neutral-600 dark:text-neutral-400"}>{userInfo.data?.firstname} {userInfo.data?.lastname} {info.creation_date.toISOString().slice(0, 10)}</p>
            <p className={"mt-2"}>{info.text}</p>
        </div>
    );
};

export default Commentary;