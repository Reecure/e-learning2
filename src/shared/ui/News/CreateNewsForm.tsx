import {FC, useEffect, useState} from "react";
import {Button, ButtonThemes, Label} from "@/shared/ui";
import {useForm} from "react-hook-form";
import {News} from "@/enteties/News/model/types/module";


interface Props {
    onSubmit: (data: News) => void;
}

const TIMEOUT = 3000;

const CreateNewsForm: FC<Props> = ({onSubmit}) => {
    const [submitError, setSubmitError] = useState(false);
    const [disableButton, setButtonDisabled] = useState(false);


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<News>();

    useEffect(() => {
        const disableButtonTimeout = setTimeout(() => {
            setButtonDisabled(false);
        }, TIMEOUT);

        return () => {
            clearTimeout(disableButtonTimeout);
        };
    }, [disableButton]);
    const submitHandler = async (data: News) => {
        setButtonDisabled(true);
        try {
            await onSubmit(data);
            reset();
        } catch (e) {
            setSubmitError(true);
            console.log(e);
        }
    };

    return (
        <>
            <form
                className={"flex flex-col gap-2 w-[200px] sm:w-[300px] md:w-[350px] lg:w-[430px]"}
                onSubmit={handleSubmit(submitHandler)}
            >
                <p className={"text-3xl mb-5 text-center font-extrabold"}>
                    Create News
                </p>
                <Label htmlFor={"title"} labelText={"Title"}>
                    <input className={"inputField"} {...register("title")} />
                </Label>
                <Label htmlFor={"description"} labelText={"Description"}>
                    <input className={"inputField"} {...register("description")} />
                </Label>

                <Button disabled={disableButton} type={"submit"} theme={ButtonThemes.FILLED}>
                    Create News
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
        </>
    );
};

export default CreateNewsForm;