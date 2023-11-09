import {FC, useState} from "react";
import Image from "next/image";
import {Modal, Notification} from "@/shared/ui";
import {User} from "@/enteties/User";
import {UploadButton} from "@/shared/utils/uploadthing";
import {trpc} from "@/shared/utils/trpc";

interface Props {
    user: User;
}

const UserAvatar: FC<Props> = ({user,}) => {
    const utils = trpc.useContext();

    const [avatarModalOpen, setAvatarModalOpen] = useState(false);
    const [uploadNotificationOpen, setUploadNotificationOpen] = useState(false);
    const [uploadError, setUploadError] = useState(false);

    const uploadAvatar = trpc.user.updateAvatar.useMutation({
        async onSuccess() {
            await utils.user.userById.invalidate();
        }
    });

    const setAvatarModalOpenHandler = () => {
        setAvatarModalOpen(prev => !prev);
    };

    const setUploadNotificationOpenHandler = () => {
        setUploadNotificationOpen(prev => !prev);
    };
    return (
        <div>
            {user.avatar.length === 0 ? (
                <div
                    onClick={setAvatarModalOpenHandler}
                    className={
                        "w-32 h-32 rounded-full bg-light-primary-main dark:bg-dark-primary-container cursor-pointer hover:opacity-70 object-cover"
                    }
                />
            ) : (
                <Image
                    src={user.avatar}
                    alt={"user-avatar"}
                    width={1920}
                    height={1080}
                    onClick={setAvatarModalOpenHandler}
                    className={
                        "w-32 h-32 rounded-full border-[1px] cursor-pointer hover:opacity-70 object-cover"
                    }
                />
            )}

            <Modal
                isOpen={avatarModalOpen}
                setIsOpen={setAvatarModalOpenHandler}
            >
                <UploadButton
                    appearance={{
                        button:
                            "bg-dark-primary-hover-second hover:opacity-70 duration-300",
                    }}
                    endpoint="imageUploader"
                    onClientUploadComplete={res => {
                        uploadAvatar.mutateAsync({
                            id: user.id,
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-expect-error
                            image_url: res[0].fileUrl,
                        });
                        console.log(res);
                        setUploadError(false);
                        setUploadNotificationOpenHandler();
                    }}
                    onUploadError={(error: Error) => {
                        setUploadError(true);
                        setUploadNotificationOpenHandler();
                    }}
                />
            </Modal>

            <Notification
                open={uploadNotificationOpen}
                onClose={setUploadNotificationOpenHandler}
                timeoutDelay={3000}
                isSuccess={!uploadError}
            >
                {uploadError ? "error" : "success"}
            </Notification>

        </div>
    );
};

export default UserAvatar;