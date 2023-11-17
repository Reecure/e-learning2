import {type FC, useEffect} from "react";
import {trpc} from "@/shared/utils/trpc";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {Button, ButtonThemes, Loader, Text} from "@/shared/ui";
import {useForm} from "react-hook-form";
import Commentary from "@/shared/ui/Commentary/Commentary";

type Props = {}

const CourseReviewsTab: FC<Props> = () => {
    const utils = trpc.useContext();
    const router = useRouter();
    const session = useSession();

    const {register, handleSubmit, formState: {errors},} = useForm({
        defaultValues: {
            text: "",
        },
    });

    const reviews = trpc.reviews.getAll.useQuery({
        course_id: router.query.id as string
    });

    const createReview = trpc.reviews.create.useMutation({
        async onSuccess() {
            await utils.reviews.getAll.invalidate();
        }
    });

    useEffect(() => {
        console.log(reviews.data);
    }, [reviews.isLoading]);

    if (reviews.isLoading) {
        return <Loader/>;
    }

    return (
        <>
            <div>
                <form
                    onSubmit={handleSubmit(async data => {
                        try {
                            createReview.mutate({
                                course_id: router.query.id as string,
                                text: data.text,
                                user_id: session.data?.user.id as string
                            });
                        } catch (error) {
                            console.log(error);
                        }
                    })}
                    className={""}
                >

                    <div>
                        <input
                            type={"text"}
                            {...register("text", {
                                required: {value: true, message: "Text is required"},
                                minLength: {value: 3, message: "Min length is 3 letters"},
                                maxLength: {value: 25, message: "Max length is 25 letters"}
                            })}
                            className={"inputField mb-2 "}
                        />
                        {(errors.text != null) && <Text error text={errors.text.message || "Error"}/>}

                    </div>
                    <div className={"flex justify-end"}>
                        <Button
                            type={"submit"}
                            theme={ButtonThemes.FILLED}
                            className={""}
                        >
                            Add comment
                        </Button>
                    </div>

                </form>
            </div>
            <div className={"flex flex-col gap-5 mt-5"}>
                {
                    reviews.data?.map(review => (
                        <Commentary key={review.id} info={review}/>
                    ))
                }
            </div>
        </>
    );
};

export default CourseReviewsTab;
