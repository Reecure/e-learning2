import {FC} from "react";
import {User} from "@/enteties/User";

interface Props {
    user: User
}

const UserInfo: FC<Props> = ({user}) => {
    return (
        <div className={"flex flex-col gap-2"}>
            <div className={"text-2xl mx-auto md:ml-5"}>
                <span className={"mr-2"}>{user.firstname}</span>
                <span className={""}>{user.lastname}</span>
            </div>
            <div className={"flex flex-col items-center justify-between gap-3 sm:items-start sm:ml-5"}>
                <span className={"px-2 py-1 bg-light-primary-main rounded-full text-neutral-300"}>
                    {user.role}
                </span>
                <div className={"flex gap-2"}>
                    <p>Studying from </p>
                    <span className={"text-light-primary-main dark:text-dark-primary-main"}>
                        {user.registration_date.toISOString().slice(0,10)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;