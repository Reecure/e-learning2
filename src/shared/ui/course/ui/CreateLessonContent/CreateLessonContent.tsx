import {type FC, useEffect, useState} from "react";
import {FormProvider, useFieldArray, useForm,} from "react-hook-form";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {v4 as uuidv4} from "uuid";
import {trpc} from "@/shared/utils/trpc";
import CodeForm from "@/shared/ui/course/ui/CourseForms/CodeForm";
import TextForm from "@/shared/ui/course/ui/CourseForms/TextForm";
import ImageForm from "@/shared/ui/course/ui/CourseForms/ImageForm";
import VideoForm from "@/shared/ui/course/ui/CourseForms/VideoForm";
import {LessonBlocks, LessonContentType} from "@/enteties/Lesson";
import {AiOutlineClose} from "react-icons/ai";
import ListForm from "@/shared/ui/course/ui/CourseForms/ListForm";

type FormData = {
    blocks: LessonBlocks[];
};

type Props = {
    initialData?: LessonBlocks[];
    lessonId: string;
    setLessonContentEditable: () => void
    setIsSuccessVisible: (id: string, visible: boolean, isSuccess: boolean, error?: string) => void
};

const BlockStyle = "flex gap-2 mt-5 sm:mt-0 items-start w-full";

const CreateLessonContent: FC<Props> = ({
    initialData,
    setIsSuccessVisible,
    setLessonContentEditable,
    lessonId,
}) => {

    const utils = trpc.useContext();

    const [imgUrl, setImgUrl] = useState("");

    const lessonUpdateContentQuery = trpc.lesson.updateContent.useMutation({
        async onSuccess() {
            await utils.module.byId.invalidate();
            await utils.lesson.byId.invalidate();
            await setIsSuccessVisible(lessonId, true, true);
        },
        onError() {
            setIsSuccessVisible(lessonId, true, false);
        }
    });

    const methods = useForm<FormData>({
        defaultValues: {blocks: initialData || []},
    });
    const {handleSubmit, reset} = methods;

    useEffect(() => {
        reset({blocks: initialData || []});
    }, [initialData, reset]);

    const onSubmit = (data: FormData) => {
        // console.log(data);

        try {
            lessonUpdateContentQuery.mutate({
                id: lessonId,
                lesson_content: {
                    ...data,
                },
            });
        } catch (e) {
            console.log(e);
        } finally {
            setLessonContentEditable();
        }
    };

    const {append, fields, remove} = useFieldArray({
        control: methods.control,
        name: "blocks",
    });

    const renderCloseButton = (index: number) => (
        <Button
            theme={ButtonThemes.TEXT}
            className="!p-2 !rounded-md"
            type="button"
            onClick={() => {
                remove(index);
            }}
        >
            <AiOutlineClose/>
        </Button>
    );

    const addTextBlock = () => {
        append({
            id: uuidv4(),
            type: LessonContentType.TEXT,
            title: "",
            paragraphs: [
                {
                    id: uuidv4(),
                    text: "",
                },
            ],
        });
    };

    const addListBlock = () => {
        append({
            id: uuidv4(),
            type: LessonContentType.LIST,
            title: "",
            listItems: [
                {
                    id: uuidv4(),
                    item: "",
                },
            ],
        });
    };

    const addImageBlock = () => {
        append({id: uuidv4(), type: LessonContentType.IMAGE, title: "", src: ""});
    };

    const addCodeBlock = () => {
        append({id: uuidv4(), type: LessonContentType.CODE, code: ""});
    };

    const addVideoBlock = () => {
        append({id: uuidv4(), type: LessonContentType.VIDEO, url: ""});
    };

    const addButtons = [{
        title: "Add Text Block",
        func: addTextBlock
    },
    {
        title: "Add Image Block",
        func: addImageBlock
    },
    {
        title: "Add Code Block",
        func: addCodeBlock
    },
    {
        title: "Add Video Block",
        func: addVideoBlock
    },
    {
        title: "Add List Block",
        func: addListBlock
    },
    ];

    return (
        <>
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={"flex flex-col gap-2 "}
                >
                    {fields.map((field, index) => (
                        <div key={field.id}
                            className={"flex gap-2 bg-light-neutral-900/60  dark:bg-neutral-600/30 rounded-xl px-5 py-5"}>
                            {
                                field.type === LessonContentType.TEXT && (
                                    <div className={BlockStyle}>
                                        <TextForm index={index}/>
                                        {renderCloseButton(index)}
                                    </div>
                                )
                            }
                            {
                                field.type === LessonContentType.IMAGE && (
                                    <div className={"flex gap-2 mt-5 sm:mt-0 items-start w-full"}>
                                        <ImageForm index={index}/>
                                        {renderCloseButton(index)}
                                    </div>
                                )
                            }
                            {
                                field.type === LessonContentType.CODE && (
                                    <div className={"flex gap-2 mt-5 sm:mt-0 items-start w-full"}>
                                        <CodeForm index={index}/>
                                        {renderCloseButton(index)}
                                    </div>
                                )
                            }
                            {
                                field.type === LessonContentType.VIDEO && (
                                    <div className={"flex gap-2 mt-5 sm:mt-0 items-start w-full"}>
                                        <VideoForm index={index}/>
                                        {renderCloseButton(index)}
                                    </div>
                                )

                            }
                            {
                                field.type === LessonContentType.LIST && (
                                    <div className={"flex gap-2 mt-5 sm:mt-0 items-start w-full"}>
                                        <ListForm index={index}/>
                                        {renderCloseButton(index)}
                                    </div>
                                )
                            }
                        </div>
                    ))}
                    <div
                        className={"grid grid-cols-1 gap-2 md:grid-cols-4 mt-5 sm:mt-0 bg-neutral-600/30 p-5 md:p-2 rounded-md"}>
                        {
                            addButtons.map(item => (
                                <Button key={item.title} theme={ButtonThemes.FILLED} onClick={item.func}>
                                    {item.title}
                                </Button>
                            ))
                        }
                    </div>
                    <div className={"flex justify-end "}>
                        <Button theme={ButtonThemes.FILLED} type="submit">
                            Save
                        </Button>
                    </div>

                </form>
            </FormProvider>
        </>
    );
};

export default CreateLessonContent;
