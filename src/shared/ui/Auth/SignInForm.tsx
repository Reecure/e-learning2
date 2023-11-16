import {FC, useState} from "react";
import {signIn} from "next-auth/react";
import {Button, ButtonThemes, Label, Text} from "@/shared/ui";
import {useForm} from "react-hook-form";
import {Routes} from "@/shared/config/routes";
import {useRouter} from "next/router";

type AuthError = {
    isError: boolean;
    message: string;
};

type LoginForm = {
    email: string;
    password: string;
};

interface Props {
}

const SignInForm: FC<Props> = () => {
    const [authError, setAuthError] = useState<AuthError>({
        isError: false,
        message: "",
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginForm>();

    const router = useRouter();

    return (
        <form
            onSubmit={handleSubmit(async data => {
                const res = await signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });

                if (res?.status !== 200) {
                    setAuthError(() => ({
                        isError: true,
                        message: res?.error || "Some error try again later",
                    }));
                } else {
                    setAuthError(prev => ({...prev, isError: false}));
                    await router.push(Routes.USER_PROFILE);
                }
            })}
            className={
                "max-w-[500px] flex flex-col gap-2 "
            }
        >
            {authError.isError && <Text error text={authError.message}/>}

            <Label htmlFor={"email"} labelText={"Email"}>
                <input
                    data-testid={"email"}
                    className={"inputField"}
                    type="text"
                    placeholder={"Enter your email"}
                    {...register("email", {required: true})}
                />
                {errors.email && <Text error text={"Email is required"}/>}
            </Label>

            <Label htmlFor="password" labelText={"Password"}>
                <input
                    data-testid={"password"}
                    className={"inputField"}
                    type="password"
                    placeholder={"Enter your password"}
                    {...register("password", {required: true})}
                />
                {errors.password && <Text error text={"Password is required"}/>}
            </Label>

            <div className={"flex justify-end mt-5"}>
                <Button data-testid={"submit"} type={"submit"} theme={ButtonThemes.FILLED} className={"w-[170px]"}>
                    Login
                </Button>
            </div>
        </form>
    );
};

export default SignInForm;