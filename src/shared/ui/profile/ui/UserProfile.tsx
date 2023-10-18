import {type FC, useState} from "react";
import {type User, UserRoles} from "@/enteties/User";
import {Button, ButtonThemes, Modal, SmallCard} from "@/shared/ui";
import EditUserProfileModal from "./EditUserProfileModal/EditUserProfileModal";
import CreateCourse from "@/shared/ui/course/ui/CreateCourse/CreateCourse";
import UserAvatar from "./UserAvatar/UserAvatar";
import UserInfo from "./UserInfo/UserInfo";
import FavoriteCourse from "@/shared/ui/profile/ui/FavoriteCourse/FavoriteCourse";
import CompleteCountInfo from "@/shared/ui/profile/ui/CompleteCountInfo/CompleteCountInfo";
import News from "@/shared/ui/profile/ui/News/News";
import ModuleProgress from "@/shared/ui/profile/ui/ModuleProgress/ModuleProgress";
import {AiOutlineSelect} from "react-icons/ai";

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
            <div className={"mb-10 sm:flex sm:justify-between bg-neutral-200 dark:bg-neutral-800 p-5 rounded-md"}>
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

            <div className={"flex gap-x-10"}>
                <div className={" flex flex-col mb-10 gap-5"}>
                    <div>
                        <h4 className={"text-neutral-300 text-lg indent-2 mb-2 font-extrabold"} >Last Course</h4>
                        <SmallCard course={{}} />
                    </div>
                    <div>
                        <h4 className={"text-neutral-300 text-lg indent-2 mb-2 font-extrabold"} >Complete Info</h4>
                        <CompleteCountInfo />
                    </div>
                </div>

                <div className={"flex flex-col gap-5"}>
                    <div>
                        <h4 className={"text-neutral-300 text-lg indent-2 mb-2 font-extrabold"} >?????</h4>
                        <div className={"w-full h-[230px] border-2 rounded-md border-dark-primary-main"}></div>
                    </div>
                    <div>
                        <div className={"flex justify-between mb-2"}>
                            <h4 className={"text-neutral-300 text-lg indent-2  font-extrabold"} >Favorite Course</h4>
                        </div>
                        <FavoriteCourse />
                    </div>
                </div>

                <div className={"flex flex-col gap-5"}>
                    <div>
                        <div className={"flex justify-between mb-2"}>
                            <h4 className={"text-neutral-300 text-lg indent-2 font-extrabold"}>Module Progress</h4>
                            <Button theme={ButtonThemes.TEXT} className={" !py-1 !px-1 rounded-md"}><AiOutlineSelect /></Button>
                        </div>
                        <ModuleProgress />
                    </div>
                    <div>
                        <h4 className={"text-neutral-300 text-lg indent-2 mb-2 font-extrabold"} >Recommendations</h4>
                        <div className={"w-[520px] h-[250px] border-2 rounded-md border-dark-primary-main"}></div>
                    </div>
                </div>
                <div className={"flex "}>
                    <News />
                </div>
            </div>

            <Modal isOpen={isEditable} setIsOpen={openHandler}>
                <EditUserProfileModal user={user}/>
            </Modal>
        </>
    );
};

export default UserProfileComponent;
