import {type FC,} from "react";
import Image from "next/image";
import {type Course} from "@/enteties/Course";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {BsClock} from "react-icons/bs";
import {CiBoxes} from "react-icons/ci";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import empty_image from "@/shared/assets/empty_image.png";

type Props = {
    course: Course;
};

const SmallCard: FC<Props> = ({course}) => {
    const utils = trpc.useContext();
    const session = useSession();

    const userLastCourse = trpc.user.updateLastVisitCourse.useMutation();
    const userFavoriteCourse = trpc.user.updateFavoriteCourse.useMutation({
        async onSuccess() {
            await utils.course.courseById.invalidate();
            await utils.user.getFavoriteCourse.invalidate();
        }
    });

    const isFavoriteCourse = trpc.user.getFavoriteCourse.useQuery({
        id: session.data?.user.id as string,
        course_id: course.id
    });



    return (
        <div className={"relative min-w-[250px] max-w-[340px] sm:w-[340px] h-[310px]"}>
            <div
                className={"absolute text-yellow-400 top-5 right-5 text-3xl z-[2] cursor-pointer hover:text-yellow-400/30"}
                onClick={(e) => {
                    e.stopPropagation();
                    if (isFavoriteCourse.data?.favorite_course === course.id) {
                        userFavoriteCourse.mutate({
                            course_id: "",
                            id: session.data?.user.id as string
                        });
                    } else {
                        userFavoriteCourse.mutate({
                            course_id: course.id,
                            id: session.data?.user.id as string
                        });
                    }
                }}>
                {isFavoriteCourse.data?.favorite_course === course.id ? <AiFillStar/> : <AiOutlineStar/>}
            </div>
            <Link href={`${Routes.USER_COURSE_PAGE}/${course?.id}`}
                className={
                    "flex flex-col p-5 bg-light-neutral-900 dark:bg-dark-neutral-100 rounded-2xl hover:bg-dark-neutral-900/70 dark:hover:bg-dark-neutral-100/70 cursor-pointer"
                }
                onClick={async () => {
                    await userLastCourse.mutate({
                        id: session.data?.user.id || "",
                        course_id: course.id
                    });
                }}>
                <div className={""}>
                    {
                        course?.cover_image !== "" ?
                            <Image
                                src={course?.cover_image}
                                width={300}
                                height={300}
                                alt={"card-image"}
                                className={"max-w-[300px] max-h-[100px] w-full h-full object-cover rounded-2xl"}
                            /> :
                            <Image
                                src={empty_image}
                                alt={"image"}
                                className={"max-w-[300px] max-h-[100px] w-full h-full object-cover rounded-2xl"}
                                width={500}
                                height={350}
                            />
                    }

                </div>
                <div className={"max-w-[300px] flex flex-col justify-between"}>
                    <div className={"flex justify-between my-4 text-light-neutral-300 dark:text-neutral-400 text-sm"}>
                        <div className={"flex items-center gap-1 "}>
                            <CiBoxes/>
                            <p className={""}>Programming</p>
                        </div>
                        <div className={"flex items-center gap-1 "}>
                            <BsClock/>
                            <p className={""}>{course.duration}</p>
                        </div>
                    </div>
                    <h4 className={"font-bold mb-1 text-2xl mb-5"}>{course?.title?.slice(0, 20)}</h4>
                    <p className={"text-sm text-light-neutral-300 dark:text-neutral-400 mb-5"}>{course?.cover_description?.slice(0, 90)}...</p>
                </div>
            </Link>
        </div>
    );
};

export default SmallCard;
