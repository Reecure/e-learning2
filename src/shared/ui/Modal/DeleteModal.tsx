import {Button, ButtonThemes, Modal} from "@/shared/ui";
import React, {FC, useEffect, useState} from "react";

interface Props {
    itemName: string
    deleteIsOpen: boolean
    deleteOpenHandler: () => void
    deleteFunc: () => void
    setNotificationOpen?: () => void
}

const DeleteModal: FC<Props> = ({deleteIsOpen, deleteOpenHandler, itemName, deleteFunc, setNotificationOpen}) => {
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
    const [deleteValue, setDeleteValue] = useState("");

    useEffect(() => {
        deleteValue === "delete"
            ? setDeleteButtonDisabled(true)
            : setDeleteButtonDisabled(false);
    }, [deleteValue]);


    const deleteValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteValue(e.currentTarget.value);
    };

    return (
        <Modal isOpen={deleteIsOpen} setIsOpen={deleteOpenHandler}>
            <form onSubmit={(event) => {
                event.preventDefault();
                deleteFunc();
                setNotificationOpen && setNotificationOpen();
            }} className={"flex flex-col gap-2"}>
                <div className={"text-xl"}>
                    Write{" "}
                    <span className={"underline text-dark-error-main"}>
                     delete
                    </span>{" "}
                    to delete {itemName}
                </div>
                <input
                    type='text'
                    className={"inputField"}
                    onChange={deleteValueHandler}
                />
                <Button
                    type={"submit"}
                    disabled={!deleteButtonDisabled}
                    theme={ButtonThemes.FILLED}
                >
                    DELETE
                </Button>
            </form>
        </Modal>
    );
};

export default DeleteModal;