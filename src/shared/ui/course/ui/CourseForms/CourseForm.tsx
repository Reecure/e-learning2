import {type FC, useEffect, useState} from "react";
import {Button, ButtonThemes, Label, Notification, Text} from "@/shared/ui";
import {Course, DifficultLevels} from "@/enteties/Course/model/types/course";
import {useForm} from "react-hook-form";
import {UploadButton} from "@/shared/utils/uploadthing";
import Image from "next/image";
import {AiOutlineClose} from "react-icons/ai";

type Props = {
    courseData: Course;
    onSubmit: (data: Course) => void;
    isCreating: boolean;
    setImageUrl: (url: string) => void
    imageUrl: string
};

const TIMEOUT = 3000;

const CourseForm: FC<Props> = ({imageUrl, setImageUrl, courseData, isCreating, onSubmit}) => {


    const [notificationOpen, setNotificationOpen] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [disableButton, setButtonDisabled] = useState(false);
    const [uploadNotificationOpen, setUploadNotificationOpen] = useState(false);
    const [uploadError, setUploadError] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: courseData, // Pass initial course data here
    });

    useEffect(() => {
        const disableButtonTimeout = setTimeout(() => {
            setButtonDisabled(false);
        }, TIMEOUT);

        return () => {
            clearTimeout(disableButtonTimeout);
        };
    }, [disableButton]);

    const notificationOpenHandler = () => {
        setNotificationOpen(prev => !prev);
    };

    const submitHandler = async (data: Course) => {
        setButtonDisabled(true);
        notificationOpenHandler();
        try {
            await onSubmit(data);
            isCreating && reset();
        } catch (e) {
            setSubmitError(true);
            console.log(e);
        }
    };

    const setUploadNotificationOpenHandler = () => {
        setUploadNotificationOpen(prev => !prev);
    };

    return (
        <>
            <form
                className={"flex flex-col gap-2 w-[200px] sm:w-[300px] md:w-[350px] lg:w-[430px]"}
                onSubmit={handleSubmit(submitHandler)}
            >
                <p className={"text-3xl mb-5 text-center font-extrabold"}>
                    {isCreating ? "Create Course" : "Edit Course"}
                </p>
                <Label htmlFor={"title"} labelText={"Title"}>
                    <input className={"inputField"} {...register("title", {
                        required: {value: true, message: "Title is required"},
                        minLength: {value: 3, message: "Min length is 3 letters"},
                        maxLength: {value: 25, message: "Max length is 25 letters"}
                    })} />
                    {(errors.title != null) && <Text error text={errors.title.message || "Error"}/>}
                </Label>
                <Label htmlFor={"cover_description"} labelText={"Cover description"}>
                    <input className={"inputField"} {...register("cover_description", {
                        required: {value: true, message: "Cover description is required"},
                        minLength: {value: 3, message: "Min length is 3 letters"},
                        maxLength: {value: 155, message: "Max length is 155 letters"}
                    })} />
                    {(errors.cover_description != null) &&
                        <Text error text={errors.cover_description.message || "Error"}/>}
                </Label>
                <Label htmlFor={"description"} labelText={"Description"}>
                    <input className={"inputField"} {...register("description", {
                        required: {value: true, message: "Description is required"},
                        minLength: {value: 3, message: "Min length is 3 letters"},
                    })} />
                    {(errors.description != null) && <Text error text={errors.description.message || "Error"}/>}
                </Label>
                <Label htmlFor={"duration"} labelText={"Duration"}>
                    <input className={"inputField"} {...register("duration", {
                        required: {value: true, message: "Duration is required"},
                        pattern: {
                            value: /^(\d+)\s+(day|month|year|days|months|years)$/i,
                            message: "Should be 3 day|month|year|days|months|years"
                        }
                    })} />
                    {(errors.duration != null) && <Text error text={errors.duration.message || "Error"}/>}
                </Label>
                <Label htmlFor={"difficulty_level"} labelText={"Difficult level"}>
                    <select
                        className={"inputField"}
                        {...register("difficulty_level")}
                        name="difficulty_level"
                        defaultValue={DifficultLevels.EASY}
                    >
                        <option className={"bg-light-background dark:bg-dark-background"} value={DifficultLevels.EASY}>
                            Easy
                        </option>
                        <option
                            className={"bg-dark-background"}
                            value={DifficultLevels.MEDIUM}
                        >
                            Medium
                        </option>
                        <option className={"bg-light-background dark:bg-dark-background"} value={DifficultLevels.HARD}>
                            Hard
                        </option>
                    </select>
                </Label>
                <div className={"flex flex-col items-start"}>
                    <p className={"mb-1 text-sm  dark:text-neutral-300 whitespace-nowrap"}>Cover Image</p>
                    <div className={"flex gap-20"}>
                        <UploadButton
                            appearance={{
                                button:
                                    " bg-dark-primary-hover-second hover:opacity-70 duration-300  focus:outline-none",
                                allowedContent: "display-none"
                            }}
                            endpoint="imageUploader"
                            onClientUploadComplete={res => {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error
                                setImageUrl(res[0].fileUrl);
                                console.log(res);
                                setUploadError(false);
                                setUploadNotificationOpenHandler();
                            }}
                            onUploadError={(error: Error) => {
                                setUploadError(true);
                                setUploadNotificationOpenHandler();
                            }}
                        />
                        {
                            imageUrl !== "" &&
                            <div className={"flex items-start gap-2 justify-start"}>
                                <Image src={imageUrl} alt={""} width={100} height={30} quality={100}
                                    className={"object-cover"}/>
                                <Button theme={ButtonThemes.TEXT} onClick={
                                    () => setImageUrl("")
                                } className={"rounded-md !p-1"}><AiOutlineClose/> </Button>

                            </div>
                        }

                    </div>
                </div>

                <div className={"flex items-center "}>
                    <label className={"relative"}>
                        <input
                            type={"checkbox"}
                            {...register("is_visible")}
                            className={
                                "peer relative top-[2px] appearance-none mr-2 w-4 h-4 rounded-sm border-[1px] "
                                + "border-neutral-950 dark:border-dark-neutral-950 "
                                + "checked:bg-light-primary-main "
                                + "dark:checked:bg-dark-primary-main "
                                + "checked:border-none"
                            }
                        />
                        <svg
                            className={
                                "absolute pointer-events-none hidden top-[3px] left-[1px] w-[15px] h-[15px] stroke-dark-primary-hover peer-checked:block"
                            }
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 12.611 8.923 17.5 20 6.5'
                            />
                        </svg>
                    </label>

                    <p className={"whitespace-nowrap"}>Open for community</p>
                </div>
                <Button disabled={disableButton} type={"submit"} theme={ButtonThemes.FILLED}>
                    {isCreating ? "Create course" : "Update course"}
                </Button>
                <Button
                    type={"button"}
                    theme={ButtonThemes.FILLED}
                    onClick={() => {
                        reset();
                    }}
                >
                    Reset
                </Button>
            </form>
            <Notification isSuccess={!submitError} open={notificationOpen} onClose={notificationOpenHandler}
                timeoutDelay={TIMEOUT}>
                {
                    submitError ? (
                        <div>{isCreating ? <p>Create error</p> : <p>Update error</p>}</div>
                    ) : (
                        <div>{isCreating ? <p>Create success</p> : <p>Update success</p>}</div>
                    )
                }
            </Notification>
            <Notification
                open={uploadNotificationOpen}
                onClose={setUploadNotificationOpenHandler}
                timeoutDelay={3000}
                isSuccess={!uploadError}
            >
                {uploadError ? "error" : "success"}
            </Notification>
        </>
    );
};

export default CourseForm;
