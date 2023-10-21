import React, {FC, useState} from "react";
import {Button, ButtonThemes, Label, Loader, Modal, Text} from "@/shared/ui";
import {BiEdit} from "react-icons/bi";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {BsTrash} from "react-icons/bs";
import {useForm} from "react-hook-form";
import {Module} from "@/enteties/Module";
import {trpc} from "@/shared/utils/trpc";
import {useRouter} from "next/router";

interface Props {
    item: Module
    visibilityLoading: boolean
    updateVisibleHandler: () => void
    deleteOpen: () => void
}

const ModuleAuthorEditableSide: FC<Props> = ({
    updateVisibleHandler, item,
    deleteOpen, visibilityLoading
}) => {
    const utils = trpc.useContext();
    const [renameOpen, setRenameOpen] = useState(false);

    const router = useRouter();
    const updateModuleTitle = trpc.module.updateInfo.useMutation({
        async onSuccess() {
            await utils.course.courseById.invalidate();
        }
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            title: item.title,
        },
    });

    const renameOpenHandler = () => {
        setRenameOpen(prev => !prev);
    };


    return (
        <>
            <div className={"flex"}>
                <Button
                    type={"submit"}
                    theme={ButtonThemes.TEXT}
                    className={"!p-2 !rounded-md"}
                    onClick={renameOpenHandler}
                >
                    <BiEdit/>
                </Button>

                <div>
                    {
                        visibilityLoading ?
                            <span className={""}><Loader className={"!w-4 !h-4 "}/></span>
                            : <Button
                                type={"submit"}
                                className={"!p-1 sm:!p-2 !rounded-md"}
                                theme={ButtonThemes.TEXT}
                                onClick={updateVisibleHandler}
                            >
                                {item.is_visible ? <AiFillEye/> : <AiFillEyeInvisible/>}
                            </Button>
                    }
                </div>

                <Button
                    type={"submit"}
                    theme={ButtonThemes.TEXT}
                    className={"!text-light-error-main dark:!text-dark-error-main !p-2 !rounded-md"}
                    onClick={deleteOpen}
                >
                    <BsTrash/>
                </Button>
            </div>

            <Modal isOpen={renameOpen} setIsOpen={renameOpenHandler} classname={"max-w-[350px] w-full"}>
                <form onSubmit={handleSubmit((data, event) => {
                    updateModuleTitle.mutate({
                        id: item.module_id,
                        course_id: router.query.id ,
                        title: data.title
                    });
                })}>
                    <Label htmlFor={"module-title"} labelText={"Module title"}>
                        <input
                            className={"inputField"}
                            {...register("title", {
                                required: {value: true, message: "Title is required"},
                                minLength: {value: 3, message: "Min length is 3 characters"},
                                maxLength: {value: 30, message: "Max length is 30 characters"},
                            })}
                        />
                        {errors.title && <Text error text={errors.title.message || "Error"}/>}
                    </Label>
                    <Button disabled={updateModuleTitle.isLoading} type={"submit"} theme={ButtonThemes.FILLED} className={"w-full mt-2"}>
                        Submit
                    </Button>
                </form>
            </Modal>
        </>
    );
};

export default ModuleAuthorEditableSide;