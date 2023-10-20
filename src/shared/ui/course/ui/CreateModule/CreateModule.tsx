import {type FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {type Module} from "@/enteties/Module";
import {Button, ButtonThemes, Label, Modal, Notification} from "@/shared/ui";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";

type Props = {
    courseId: string;
};

const confirmDelay = 3000;

const CreateModule: FC<Props> = ({courseId}) => {
    const utils = trpc.useContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [submitError, setSubmitError] = useState({isError: false, error: ""});
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const session = useSession();

    const createModules = trpc.module.create.useMutation({
        async onSuccess() {
            await utils.module.byCourseId.invalidate();
        }
    });
    const getModules = trpc.module.byCourseId.useQuery({
        id: courseId,
    });

    const {register, handleSubmit} = useForm<Module>({
        defaultValues: {
            course_id: "",
            order: getModules.data?.length,
            is_visible: true,
            title: "",
        },
    });

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (buttonDisabled) {
            const timeoutId = setTimeout(() => {
                setButtonDisabled(false);
            }, confirmDelay);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [buttonDisabled]);

    const modalOpenHandler = () => {
        setModalOpen(prev => !prev);
    };

    const setNotificationOpenHandler = () => {
        setNotificationOpen(prev => !prev);
    };

    return (
        <div>
            <div
                onClick={modalOpenHandler}
                className={
                    "mt-10 flex items-center justify-center w-full border-dashed border-[1px] py-3 border-light-primary-main dark:border-dark-primary-main hover:border-opacity-60  hover:text-opacity-60 cursor-pointer text-light-primary-main  dark:text-dark-primary-main"
                }
            >
                <p>Add module</p>
            </div>
            <Modal isOpen={modalOpen} setIsOpen={modalOpenHandler}>
                <form
                    onSubmit={handleSubmit(async data => {
                        try {
                            await createModules.mutate({
                                ...data,
                                course_id: courseId,
                                author_id: session.data?.user.id || "",
                            });
                            setSubmitError({isError: false, error: ""});
                            setNotificationOpenHandler();
                            setButtonDisabled(true);
                        } catch (error) {
                            setSubmitError({isError: true, error: "some error"});
                            setNotificationOpenHandler();
                            setButtonDisabled(true);
                        }
                    })}
                    className={"flex flex-col gap-2 w-[300px]"}
                >
                    <p className={"mb-5 text-center text-3xl"}>Create Module</p>
                    <Label htmlFor={"title"} labelText={"Title"}>
                        <input
                            type='text'
                            {...register("title")}
                            className={"inputField"}
                        />
                    </Label>
                    <Button
                        type={"submit"}
                        disabled={buttonDisabled || createModules.isLoading}
                        theme={ButtonThemes.FILLED}
                        className={"mt-5 w-full"}
                    >
                        Create module
                    </Button>
                </form>
            </Modal>

            <Notification
                open={notificationOpen}
                onClose={setNotificationOpenHandler}
                isSuccess={!submitError.isError}
                timeoutDelay={confirmDelay}
            >
                {submitError.isError
                    ? "Some server error try later"
                    : "Module create success. Reload page."}
            </Notification>
        </div>
    );
};

export default CreateModule;
