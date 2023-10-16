import {type FC, useState} from "react";
import {type User} from "@/enteties/User";
import {Button, ButtonThemes, EditUserProfileModal, Modal} from "@/shared/ui";

type Props = {
    user: User;
    index: number;
};

const UserRaw: FC<Props> = ({user, index}) => {
    const [isEditable, setIsEditable] = useState(false);
    const openHandler = () => {
        setIsEditable(prev => !prev);
    };

    return (
        <>
            <tr className={"border-b-2 border-light-primary-main "}>
                <td
                    className={"p-1  text-center border-light-primary-main  border-r-2"}
                >
                    {index + 1}
                </td>
                <td
                    className={"p-1  text-center border-light-primary-main  border-r-2"}
                >
                    {user.firstname}
                </td>
                <td
                    className={"p-1  text-center border-light-primary-main  border-r-2"}
                >
                    {user.lastname}
                </td>
                <td
                    className={"p-1  text-center border-light-primary-main  border-r-2"}
                >
                    {user.email}
                </td>
                <td
                    className={"p-1  text-center border-light-primary-main  border-r-2"}
                >
                    {user.role}
                </td>
                <td className={"flex justify-center gap-3 p-1"}>
                    <Button theme={ButtonThemes.FILLED} className={"!px-4 !py-1"}>
                        Ban
                    </Button>
                    <Button
                        theme={ButtonThemes.FILLED}
                        className={"!px-4 !py-1"}
                        onClick={openHandler}
                    >
                        Edit
                    </Button>
                </td>
            </tr>
            <Modal
                classname={"max-w-[400px] w-full"}
                isOpen={isEditable}
                setIsOpen={openHandler}
            >
                <EditUserProfileModal user={user}/>
            </Modal>
        </>
    );
};

export default UserRaw;
