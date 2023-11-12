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

type FormData = {
    blocks: LessonBlocks[];
};

type Props = {
    initialData?: LessonBlocks[];
    lessonId: string;
    setLessonContentEditable: () => void
    setIsSuccessVisible: (id: string, visible: boolean, isSuccess: boolean, error?: string) => void
};

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
            setIsSuccessVisible(lessonId, true, true);
        }
    };

    const {append, fields, remove} = useFieldArray({
        control: methods.control,
        name: "blocks",
    });

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

    const addImageBlock = () => {
        append({id: uuidv4(), type: LessonContentType.IMAGE, title: "", src: ""});
    };

    const addCodeBlock = () => {
        append({id: uuidv4(), type: LessonContentType.CODE, code: ""});
    };

    const addVideoBlock = () => {
        append({id: uuidv4(), type: LessonContentType.VIDEO, url: ""});
    };

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
                            {field.type === LessonContentType.TEXT ? (
                                <div className={"flex gap-2 mt-5 sm:mt-0 items-start w-full"}>
                                    <TextForm index={index}/>
                                    <Button
                                        theme={ButtonThemes.TEXT}
                                        className={"!p-2 rounded-md"}
                                        type="button"
                                        onClick={() => {
                                            remove(index);
                                        }}
                                    >
                                        <AiOutlineClose/>
                                    </Button>
                                </div>
                            ) : field.type === LessonContentType.IMAGE ? (
                                <div className={"flex gap-2 mt-5 sm:mt-0 items-start w-full"}>
                                    <ImageForm index={index}/>
                                    <Button
                                        theme={ButtonThemes.TEXT}
                                        className={"!p-2 rounded-md"}
                                        type="button"
                                        onClick={() => {
                                            remove(index);
                                        }}
                                    >
                                        <AiOutlineClose/>
                                    </Button>
                                </div>
                            ) : field.type === LessonContentType.CODE ? (
                                <div className={"flex gap-2 mt-5 sm:mt-0 items-start w-full"}>
                                    <CodeForm index={index}/>
                                    <Button
                                        theme={ButtonThemes.TEXT}
                                        className={"!p-2 rounded-md"}
                                        type="button"
                                        onClick={() => {
                                            remove(index);
                                        }}
                                    >
                                        <AiOutlineClose/>
                                    </Button>
                                </div>
                            ) : field.type === LessonContentType.VIDEO ? (
                                <div className={"flex gap-2 mt-5 sm:mt-0 items-start w-full"}>
                                    <VideoForm index={index}/>
                                    <Button
                                        theme={ButtonThemes.TEXT}
                                        className={"!p-2 rounded-md"}
                                        type="button"
                                        onClick={() => {
                                            remove(index);
                                        }}
                                    >
                                        <AiOutlineClose/>
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                    ))}
                    <div className={"flex flex-col mt-5 sm:mt-0 sm:flex-row gap-3"}>
                        <Button theme={ButtonThemes.FILLED} onClick={addTextBlock}>
                            Add Text Block
                        </Button>
                        <Button theme={ButtonThemes.FILLED} onClick={addImageBlock}>
                            Add Image Block
                        </Button>
                        <Button theme={ButtonThemes.FILLED} onClick={addCodeBlock}>
                            Add Code Block
                        </Button>
                        <Button theme={ButtonThemes.FILLED} onClick={addVideoBlock}>
                            Add Video Block
                        </Button>
                    </div>
                    <Button theme={ButtonThemes.FILLED} type='submit'>
                        Save
                    </Button>
                </form>
            </FormProvider>
        </>
    );
};

export default CreateLessonContent;
