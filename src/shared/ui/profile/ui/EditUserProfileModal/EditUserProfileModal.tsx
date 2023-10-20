import {type FC, useState} from "react";
import {type User, UserRoles} from "@/enteties/User";
import {Button, Label, Notification, Text} from "@/shared/ui";
import {trpc} from "@/shared/utils/trpc";
import {type SubmitHandler, useForm} from "react-hook-form";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {useSession} from "next-auth/react";

interface Props {
    user: User
}

const EditUserProfileModal: FC<Props> = ({user}) => {
    const utils = trpc.useContext();
    const session = useSession();
    const [userDefault, setUserDefault] = useState(user);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const updateUserInfo = trpc.user.updateUser.useMutation({
        async onSuccess() {
            // refetches user
            await utils.user.userById.invalidate();
            await utils.user.all.invalidate();
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            ...user,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role
        }
    });

    const notificationOpenHandler = () => {
        setNotificationOpen(prev => !prev);
    };

    const cancelFormHandler = () => {
        reset(userDefault);
    };

    const onSubmitFormHandler: SubmitHandler<User> = data => {
        notificationOpenHandler();
        try {
            updateUserInfo.mutateAsync(data);
            setUserDefault(data);
        } catch (e) {
            setSubmitError(true);
        }
    };

    return (
        <>
            <form
                className={"flex flex-col gap-2 w-full"}
                onSubmit={handleSubmit(onSubmitFormHandler)}
            >
                <p className={"mb-5 text-3xl text-center"}>Edit profile</p>
                <Label htmlFor={"firstname"} labelText={"Firstname"}>
                    <input
                        className='inputField'
                        {...register("firstname", {
                            required: {value: true, message: "Firstname is required"},
                            minLength: {value: 3, message: "Min length is 3 letters"},
                            maxLength: {value: 25, message: "Max length is 25 letters"}
                        })}
                    />
                    {(errors.firstname != null) && <Text error text={errors.firstname.message || "Error"}/>}
                </Label>
                <Label htmlFor={"lastname"} labelText={"Lastname"}>
                    <input
                        className='inputField'
                        {...register("lastname",
                            {
                                required: {value: true, message: "Lastname is required"},
                                minLength: {value: 3, message: "Min length is 3 letters"},
                                maxLength: {value: 25, message: "Max length is 25 letters"}
                            })}
                    />
                    {(errors.lastname != null) && <Text error text={errors.lastname.message || "Error"}/>}
                </Label>
                {session.data?.user.role === UserRoles.ADMIN && (
                    <>
                        <Label htmlFor={"role"} labelText={"Role"}>
                            <select
                                className='bg-transparent border-[1px] border-light-primary-main dark:border-dark-primary-main p-1 w-full rounded-md  focus:outline-0 '
                                {...register("role")}
                            >
                                {
                                    Object.values(UserRoles).map(role => {
                                        return <option
                                            key={role}
                                            className={"bg-light-background dark:bg-dark-background"}
                                            value={role}
                                        >
                                            {role}
                                        </option>;
                                    })
                                }
                            </select>
                        </Label>
                    </>
                )}
                <>
                    <Button type={"submit"} theme={ButtonThemes.FILLED} disabled={updateUserInfo.isLoading}>
                        Save
                    </Button>
                    <Button
                        theme={ButtonThemes.FILLED}
                        onClick={() => {
                            cancelFormHandler();
                        }}
                    >
                        Reset
                    </Button>
                </>
            </form>
            <Notification open={notificationOpen} onClose={notificationOpenHandler} timeoutDelay={500}
                isSuccess={!submitError}>
                success
            </Notification>
        </>
    );
};

export default EditUserProfileModal;
