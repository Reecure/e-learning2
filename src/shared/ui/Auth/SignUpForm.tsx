import {FC, useState} from "react";
import {Button, ButtonThemes, Label, Loader, Text} from "@/shared/ui";
import {useForm} from "react-hook-form";
import {trpc} from "@/shared/utils/trpc";
import {Routes} from "@/shared/config/routes";
import {useRouter} from "next/router";

type SignupForm = {
    firstname: string;
    lastname: string;
    password: string;
    email: string;
};

interface Props {
}

const SignUpForm: FC<Props> = () => {

    const [error, setError] = useState("");
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SignupForm>({
        defaultValues: {
            email: "",
            lastname: "",
            password: "",
            firstname: "",
        },
    });


    const mutation = trpc.user.createUser.useMutation({
        async onError(error) {
            console.log("error", error);
            setError(error.message);
        },
        async onSuccess() {
            setError("");
            await router.push(Routes.LOGIN);
        }
    });



    if (mutation.isLoading) {
        return <Loader/>;
    }

    return (
        <form
            onSubmit={handleSubmit(async data => {
                await mutation.mutate(data);
            })}
            className={
                "max-w-[500px] flex flex-col gap-2"
            }
        >
            {error !== "" && <Text error text={error}/>}

            <Label htmlFor={"firstname"} labelText={"Firstname"}>
                <input
                    className={"inputField"}
                    placeholder={"Jake"}
                    {...register("firstname", {
                        required: {value: true, message: "Firstname is required"},
                        minLength: {value: 3, message: "Min length is 3 letters"},
                        maxLength: {value: 25, message: "Max length is 25 letters"}
                    })}
                />
                {errors.firstname && <Text error text={errors.firstname.message || "Error"}/>}
            </Label>

            <Label htmlFor={"lastname"} labelText={"Lastname"}>
                <input
                    className={"inputField"}
                    placeholder={"Cole"}
                    type='text'
                    {...register("lastname", {
                        required: {value: true, message: "Lastname is required"},
                        minLength: {value: 3, message: "Min length is 3 letters"},
                        maxLength: {value: 25, message: "Max length is 25 letters"}
                    })}
                />
                {errors.lastname && <Text error text={errors.lastname.message || "Error"}/>}
            </Label>

            <Label htmlFor={"email"} labelText={"Email"}>
                <input
                    className={"inputField"}
                    type='text'
                    placeholder={"example@mail.com"}
                    {...register("email", {
                        required: {value: true, message: "Email is required"},
                        pattern: {value: RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), message: "Not valid email"}
                    })}
                />
                {errors.email && <Text error text={errors.email.message || "Error"}/>}
            </Label>

            <Label htmlFor={"password"} labelText={"Password"}>
                <input
                    className={"inputField"}
                    type='password'
                    {...register("password", {
                        required: {value: true, message: "Password is required"},
                        minLength: {value: 8, message: "Min length is 8 characters"},
                    })}
                />
                {errors.password && <Text error text={errors.password.message || "Error"}/>}
            </Label>
            <div className={"flex justify-end mt-5"}>
                <Button type={"submit"} theme={ButtonThemes.FILLED} className={"w-[170px]"}>
                    Register
                </Button>
            </div>

        </form>
    );
};

export default SignUpForm;