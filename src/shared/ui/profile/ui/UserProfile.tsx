import {type FC, useEffect, useState} from "react";
import {type User, UserRoles} from "@/enteties/User";
import {Button, ButtonThemes, Modal} from "@/shared/ui";
import EditUserProfileModal from "./EditUserProfileModal/EditUserProfileModal";
import CreateCourse from "@/shared/ui/course/ui/CreateCourse/CreateCourse";
import UserAvatar from "./UserAvatar/UserAvatar";
import UserInfo from "./UserInfo/UserInfo";

type Props = {
    user: User;
};

const UserProfileComponent: FC<Props> = ({user}) => {
    const [isEditable, setEditable] = useState(false);

    const openHandler = () => {
        setEditable(prev => !prev);
    };

	 return (
        <>
            <div className={"sm:flex sm:justify-between bg-neutral-200 dark:bg-neutral-800 p-5 rounded-md"}>
                <div className={"sm:flex items-center "}>
                    <UserAvatar user={user} />

                    <UserInfo user={user}/>
                </div>

                <div className={"flex items-start mt-5 sm:mt-0 sm:items-end gap-x-2"}>
                    <Button theme={ButtonThemes.FILLED} onClick={openHandler}>
                        Edit
                    </Button>
                    {(user.role === UserRoles.ADMIN
                        || user.role === UserRoles.TEACHER) && <CreateCourse/>}
                </div>
            </div>

            <Modal isOpen={isEditable} setIsOpen={openHandler}>
                <EditUserProfileModal user={user}/>
            </Modal>
        </>
    );
};

export default UserProfileComponent;
