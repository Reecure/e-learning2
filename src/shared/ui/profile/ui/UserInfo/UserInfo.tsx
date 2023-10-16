import {FC} from "react";
import {User} from "@/enteties/User";

interface Props {
    user: User
}

const UserInfo: FC<Props> = ({user}) => {
    return (
        <div className={"ml-5 flex flex-col gap-2"}>
            <div className={"text-2xl"}>
                <span className={"mr-2"}>{user.firstname}</span>
                <span className={""}>{user.lastname}</span>
            </div>
			 <div>
                <span className={"px-2 py-1 bg-light-primary-main rounded-full text-white"}>
                    {user.role}
                </span>
                <div className={"flex gap-1 mt-2"}>
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