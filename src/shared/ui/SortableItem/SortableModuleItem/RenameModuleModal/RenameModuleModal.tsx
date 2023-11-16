import React, {FC} from "react";
import {Button, ButtonThemes, Label, Modal, Text} from "@/shared/ui";
import {useForm} from "react-hook-form";
import {trpc} from "@/shared/utils/trpc";
import {useRouter} from "next/router";
import {CourseModules} from "@/enteties/Course/model/types/course";

interface Props {
    renameOpen: boolean;
    renameOpenHandler: () => void;
    item: CourseModules;
}

const RenameModuleModal: FC<Props> = ({renameOpen, renameOpenHandler, item}) => {
    const utils = trpc.useContext();
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

    return (
        <Modal isOpen={renameOpen} setIsOpen={renameOpenHandler} classname={"max-w-[350px] w-full"}>
            <form onSubmit={handleSubmit((data, event) => {
                updateModuleTitle.mutate({
                    id: item.module_id,
                    course_id: router.query.id as string,
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
                <Button disabled={updateModuleTitle.isLoading} type={"submit"} theme={ButtonThemes.FILLED}
                    className={"w-full mt-2"}>
                    Submit
                </Button>
            </form>
        </Modal>
    );
};

export default RenameModuleModal;