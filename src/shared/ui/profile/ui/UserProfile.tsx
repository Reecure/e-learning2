import {type FC, useState} from "react";
import {type User, UserRoles} from "@/enteties/User";
import {Button, ButtonThemes, Loader, Modal, SmallCard} from "@/shared/ui";
import EditUserProfileModal from "./EditUserProfileModal/EditUserProfileModal";
import CreateCourse from "@/shared/ui/course/ui/CreateCourse/CreateCourse";
import UserAvatar from "./UserAvatar/UserAvatar";
import UserInfo from "./UserInfo/UserInfo";
import FavoriteCourse from "@/shared/ui/profile/ui/FavoriteCourse/FavoriteCourse";
import CompleteCountInfo from "@/shared/ui/profile/ui/CompleteCountInfo/CompleteCountInfo";
import News from "@/shared/ui/profile/ui/News/News";
import ModuleProgress from "@/shared/ui/profile/ui/ModuleProgress/ModuleProgress";
import {AiOutlineSelect} from "react-icons/ai";
import {trpc} from "@/shared/utils/trpc";
import {Course} from "@/enteties/Course";

type Props = {
    user: User;
};

const UserProfileComponent: FC<Props> = ({user}) => {
    const [isEditable, setEditable] = useState(false);

    const openHandler = () => {
        setEditable(prev => !prev);
    };

    const course = trpc.course.courseById.useQuery({id: "65326f1635c169828e650cf9"});

    if (course.isLoading){
        return <Loader />;
    }

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
                        || user.role === UserRoles.TEACHER) && <CreateCourse/>}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] 2xl:grid-cols-[350px_1fr_350px] gap-4">

                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2"}>
                    <div className={"mx-auto md:mx-0"}>
                        <h4 className={"text-neutral-300 text-lg indent-2 mb-2 font-extrabold"} >Last Course</h4>
                        <SmallCard course={course.data as Course} />
                    </div>
                    <div className={"mx-auto md:mx-0"}>
                        <h4 className={"text-neutral-300 text-lg indent-2 mb-2 font-extrabold"} >Recommendation</h4>
                        <SmallCard course={course.data as Course} />
                    </div>

                </div>

                <div className={"grid grid-cols-1 items-center gap-2"}>
                    <div className={""}>
                        <h4 className={"text-neutral-300 text-lg indent-2 font-extrabold"}>Week Progress</h4>
                        <ModuleProgress />
                    </div>
                    <div className={"grid grid-cols-1 md:grid-cols-2  gap-3"}>
                        <div className={"mx-auto md:mx-0"}>
                            <div className={"flex justify-between mb-2"}>
                                <h4 className={"text-neutral-300 text-lg indent-2  font-extrabold"} >Favorite Course</h4>
                            </div>
                            <FavoriteCourse course={course.data as Course} />
                        </div>
                        <div className={"mx-auto md:mx-0"}>
                            <h4 className={"text-neutral-300 text-lg indent-2 mb-2 font-extrabold"} >Complete Info</h4>
                            <CompleteCountInfo />
                        </div>
                    </div>
                </div>

                <div className={"flex "}>
                    <News />
                </div>
            </div>

            {/*<div className={"grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"}>*/}
            {/*    <div className={"flex flex-col items-center md:flex-row md:justify-between lg:flex-col w-full mb-10 gap-5 sm:mb-0"}>*/}
            {/*        */}
            {/*    </div>*/}

            {/*    <div className={"flex flex-col items-center md:flex-row md:justify-between lg:flex-col w-full mb-10 gap-5 sm:mb-0"}>*/}

            {/*    </div>*/}

            {/*    <div className={"flex flex-col items-center md:flex-row md:justify-between lg:flex-col w-full mb-10 gap-5 sm:mb-0"}>*/}

            {/*    </div>*/}

            {/*</div>*/}

            <Modal isOpen={isEditable} setIsOpen={openHandler}>
                <EditUserProfileModal user={user}/>
            </Modal>
        </>
    );
};

export default UserProfileComponent;
