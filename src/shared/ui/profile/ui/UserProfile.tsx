import {type FC, useState} from "react";
import {type User, UserRoles} from "@/enteties/User";
import {Button, ButtonThemes, Modal} from "@/shared/ui";
import EditUserProfileModal from "./EditUserProfileModal/EditUserProfileModal";
import CreateCourse from "@/shared/ui/course/ui/CreateCourse/CreateCourse";
import UserAvatar from "./UserAvatar/UserAvatar";
import UserInfo from "./UserInfo/UserInfo";
import FavoriteCourse from "@/shared/ui/profile/ui/FavoriteCourse/FavoriteCourse";
import CompleteCountInfo from "@/shared/ui/profile/ui/CompleteCountInfo/CompleteCountInfo";
import News from "@/shared/ui/profile/ui/News/News";
import WeekProgress from "@/shared/ui/profile/ui/ModuleProgress/ModuleProgress";
import LastCourse from "@/shared/ui/profile/ui/LastCourse/LastCourse";
import CompleteLater from "@/shared/ui/profile/ui/CompleteLater/CompleteLater";
import CreateNews from "@/shared/ui/course/ui/CreateNews/CreateNews";

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
            <div className={"mb-10 sm:flex sm:justify-between bg-neutral-200 dark:bg-neutral-800/50 p-5 rounded-md"}>
                <div className={"sm:flex items-center "}>
                    <div className={"flex justify-center mb-3"}>
                        <UserAvatar user={user} />
                    </div>

                    <UserInfo user={user}/>
                </div>

                <div className={"flex flex-col md:flex-row gap-4 items-start mt-5 sm:mt-0 sm:items-end gap-x-2"}>
                    <Button className={"w-full"} theme={ButtonThemes.FILLED} onClick={openHandler}>
                        Edit
                    </Button>
                    {(user.role === UserRoles.ADMIN
                        || user.role === UserRoles.TEACHER) && <div className={"flex flex-col gap-3 w-full"}>
                        <CreateNews/>
                        <CreateCourse/>
                    </div>}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] 2xl:grid-cols-[350px_1fr_350px] gap-4">

                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5"}>
                    <div className={"mx-auto md:mx-0"}>
                        <h4 className={"text-neutral-300 text-lg indent-2 mb-2 font-extrabold"}>Last Course</h4>
                        <LastCourse course_id={user.last_course ?? ""}/>
                    </div>
                    <div className={"mx-auto md:mx-0"}>
                        <h4 className={"text-neutral-300 text-lg indent-2 mb-2 font-extrabold"}>Complete later</h4>
                        <CompleteLater user_id={user.id}/>
                    </div>

                </div>

                <div className={"grid grid-cols-1 justify-center items-center gap-2"}>
                    <div className={""}>
                        <h4 className={"text-neutral-300 text-lg indent-2 font-extrabold"}>Week Progress</h4>
                        <WeekProgress user_id={user.id}  />
                    </div>
                    <div className={"grid grid-cols-1 md:grid-cols-2 justify-between  gap-3"}>
                        <div className={"w-full flex flex-col items-center"}>
                            <div>
                                <div className={"flex items-center justify-between max-w-[330px]  mb-2"}>
                                    <h4 className={"text-neutral-300 text-lg indent-2  font-extrabold"} >Favorite Course</h4>
                                </div>
                                <FavoriteCourse course_id={user.favorite_course ?? ""} />
                            </div>
                        </div>
                        <div className={"w-full flex flex-col items-center"}>
                            <div>
                                <h4 className={"text-neutral-300 text-lg indent-2 mb-2 font-extrabold"} >Complete Info</h4>
                                <CompleteCountInfo user_id={user.id} />
                            </div>
                        </div>
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
