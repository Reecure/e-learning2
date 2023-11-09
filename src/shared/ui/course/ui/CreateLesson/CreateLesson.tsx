import {type FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {type Lesson, LessonType} from "@/enteties/Lesson";
import {trpc} from "@/shared/utils/trpc";
import {Button, ButtonThemes, Label, Loader, Modal, Notification, Text} from "@/shared/ui";
import {useSession} from "next-auth/react";

type Props = {
    moduleId: string;
};

const CreateLesson: FC<Props> = ({moduleId}) => {
    const utils = trpc.useContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [submitError, setSubmitError] = useState({isError: false, error: ""});
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const createLesson = trpc.lesson.create.useMutation({
        async onSuccess(){
            await utils.module.byId.invalidate();
        }
    });
    const lessonsQuery = trpc.module.byId.useQuery({
        id: moduleId,
    });
    const session = useSession();

    const {register, handleSubmit, formState: {errors}} = useForm<Lesson>({
        defaultValues: {
            title: "",
            lesson_type: LessonType.TEXT,
            module_id: moduleId,
            lesson_content: {
                blocks: [],
            },
            order: 0,
        },
    });

    useEffect(() => {
        if (createLesson.isError) {
            setSubmitError({isError: true, error: "some error"});
        } else if (!createLesson.isError) {
            setSubmitError({isError: false, error: ""});
        }
    }, [createLesson.isError]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (buttonDisabled) {
            const timeoutId = setTimeout(() => {
                setButtonDisabled(false);
            }, 3000);
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

    if (lessonsQuery.isLoading) {
        return <Loader/>;
    }

    return (
        <div>
            <div
                onClick={modalOpenHandler}
                className={
                    "mb-5 flex items-center justify-center w-full border-dashed border-[1px] py-2 "
                    + "border-light-primary-main dark:border-dark-primary-main hover:border-opacity-60 "
                    + "hover:text-opacity-60 cursor-pointer text-light-primary-main dark:text-dark-primary-main"
                }
            >
                <p>Add Lesson</p>
            </div>

            <Modal isOpen={modalOpen} setIsOpen={modalOpenHandler}>
                <form
                    onSubmit={handleSubmit(data => {
                        try {
                            createLesson.mutate({
                                author_id: session.data?.user.id || "",
                                lesson_type: data.lesson_type,
                                order: lessonsQuery.data?.lessons.length || 0,
                                module_id: moduleId,
                                is_visible: true,
                                lesson_content: {
                                    blocks: []
                                },
                                title: data.title,
                            });

                            setNotificationOpenHandler();
                            setButtonDisabled(true);
                        } catch (error) {
                            setSubmitError({isError: true, error: "some error"});
                            setNotificationOpenHandler();
                            setButtonDisabled(true);
                        }
                    })}
                    className={"flex flex-col gap-2 w-[200px] sm:w-[300px]"}
                >
                    <p className={"text-center text-3xl"}>Create Lesson</p>
                    <Label htmlFor={"title"} labelText={"Title"}>
                        <input
                            type="text"
                            {...register("title", {
                                required: {value: true, message: "Title is required"},
                                minLength: {value: 3, message: "Min length is 3 letters"},
                                maxLength: {value: 25, message: "Max length is 25 letters"}
                            })}
                            className={"inputField"}
                        />
                        {(errors.title != null) && <Text error text={errors.title.message || "Error"}/>}
                    </Label>
                    <Label htmlFor={"lesson_type"} labelText={"Lesson Type"}>
                        <select className={"inputField"} {...register("lesson_type")}>
                            <option className={"bg-light-background dark:bg-dark-background"} value={LessonType.TEXT}>
                                {LessonType.TEXT}
                            </option>
                            <option className={"bg-light-background dark:bg-dark-background"} value={LessonType.QUIZ}>
                                {LessonType.QUIZ}
                            </option>
                        </select>
                    </Label>
                    <Button
                        type={"submit"}
                        disabled={buttonDisabled}
                        theme={ButtonThemes.FILLED}
                        className={"mt-5 w-full"}
                    >
                        Create lesson
                    </Button>
                </form>
            </Modal>

            <Notification
                open={notificationOpen}
                onClose={setNotificationOpenHandler}
                isSuccess={!submitError.isError}
                timeoutDelay={3000}
            >
                {submitError.isError
                    ? "Some server error try later"
                    : "Lesson create success."}
            </Notification>
        </div>
    );
};

export default CreateLesson;
