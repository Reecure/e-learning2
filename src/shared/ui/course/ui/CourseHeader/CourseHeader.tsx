import {type FC, useEffect, useState} from "react";
import {difficultLevelBadgeHelper} from "@/shared/helpers";
import Image from "next/image";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {type Course} from "@/enteties/Course";
import {useRouter} from "next/router";
import CourseForm from "@/shared/ui/course/ui/CourseForms/CourseForm";
import {Button, ButtonThemes, DeleteModal, Modal} from "@/shared/ui";
import {Routes} from "@/shared/config/routes";
import {LuUsers2} from "react-icons/lu";
import {BsClock} from "react-icons/bs";
import {AiOutlineCalendar} from "react-icons/ai";

type Props = {
    course: Course;
    isUserCourse: boolean;
};

const CourseHeader: FC<Props> = ({course, isUserCourse}) => {
    const utils = trpc.useContext();

    const [userHaveCourse, setUserHaveCourse] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteCourseModalOpen, setDeleteCourseModalOpen] = useState(false);

    const router = useRouter();
    const session = useSession();


    const user = trpc.user.userById.useQuery({id: session.data?.user.id || ""});
    const updateUserCourseProgress = trpc.progress.updateUserCourseProgress.useMutation();

    const deleteCourseFromUserCourses = trpc.user.deleteUserCourses.useMutation({
        async onSuccess() {
            // refetches user
            await utils.user.userById.invalidate();
        },
    });

    const addToCourses = trpc.user.updateUserCourses.useMutation({
        async onSuccess() {
            // refetches user
            await utils.user.userById.invalidate();
        },
    });

    const updateCourse = trpc.course.updateCourse.useMutation({
        async onSuccess() {
            // refetches user
            await utils.course.courseById.invalidate();
        },
    });

    const deleteCourse = trpc.course.deleteCourse.useMutation({
        async onSuccess() {
            router.push(Routes.COURSES);
        },
    });

    useEffect(() => {
        const courseHaveStudentId
            = user.data?.courses !== null
            && user?.data?.courses.find(id => id === course?.id);
        setUserHaveCourse(courseHaveStudentId !== undefined);
    }, [deleteCourseFromUserCourses, addToCourses]);

    const openEditHandler = () => {
        setEditModalOpen(prev => !prev);
    };

    const deleteCourseModalOpenHandler = () => {
        setDeleteCourseModalOpen(prev => !prev);
    };

    const deleteCourseHandler = () => {
        deleteCourse.mutate({
            id: course?.id,
        });
        deleteCourseModalOpenHandler();
    };

    const updateCourseHandler = async (data: Course) => {
        await updateCourse.mutate({
            isVisible: data.is_visible,
            cover_description: data.cover_description,
            duration: data.duration,
            description: data.description,
            difficulty_level: data.difficulty_level,
            cover_image: data.cover_image,
            title: data.title,
            id: data.id
        });
    };

    return (
        <div className={"flex justify-between mb-14"}>

            <div className={"flex flex-col justify-between"}>
                <div className={""}>
                    <div className={"flex items-start justify-between flex-row-reverse "}>
                        {difficultLevelBadgeHelper(course?.difficulty_level)}
                        <div className={"max-w-[400px] mb-5"}>
                            <h3 className={"text-3xl font-extrabold"}>{course?.title}</h3>
                        </div>
                    </div>
                    <Image
                        src={course?.cover_image}
                        alt={"image"}
                        className={"md:hidden max-w-[300px] rounded-md mx-auto mb-5 object-cover"}
                        width={500}
                        height={350}
                    />

                    <div className={"max-w-[600px] mb-5"}>
                        <p>{course?.cover_description}</p>
                    </div>
                </div>


                <div className={"flex justify-center flex-col gap-3"}>
                    <div className={"grid grid-cols-2 gap-3"}>
                        <div className={"flex items-center gap-2"}>
                            <LuUsers2 />
                            <p>
                                {/* eslint no-constant-condition: "off" */}
                                <span>{1}</span> {1 !== 1 ? "students" : "student"}
                            </p>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <BsClock />
                            <p>{course?.duration}</p>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <AiOutlineCalendar/>
                            <p>Created at 27.03.23</p>
                        </div>
                        <div className={"flex items-center gap-2"}>
                            <AiOutlineCalendar/>
                            <p>Last update at 27.03.23</p>
                        </div>
                    </div>
                    <>
                        <div className={"flex flex-col sm:flex-row gap-2"}>
                            {userHaveCourse ? (
                                <Button
                                    disabled={deleteCourseFromUserCourses.isLoading}
                                    theme={ButtonThemes.FILLED}
                                    onClick={async () => {
                                        try {
                                            await deleteCourseFromUserCourses.mutate({
                                                id: session.data?.user.id || "",
                                                course_id: course?.id,
                                            });
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }}
                                >
                                    Remove from Courses
                                </Button>
                            ) : (
                                <Button
                                    disabled={addToCourses.isLoading}
                                    theme={ButtonThemes.FILLED}
                                    onClick={async () => {
                                        try {
                                            await addToCourses.mutate({
                                                id: session.data?.user.id || "",
                                                course_id: course?.id,
                                            });

                                            await updateUserCourseProgress.mutate({
                                                id: session.data?.user.id || "",
                                                course_progress: {
                                                    course_name: course.title,
                                                    course_id: course?.id,
                                                    is_completed: false,
                                                },
                                            });
                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }}
                                >
                                    Add to courses
                                </Button>
                            )}
                            {isUserCourse && (
                                <>
                                    <Button theme={ButtonThemes.FILLED} onClick={openEditHandler}>
                                        Edit course
                                    </Button>
                                    <Button theme={ButtonThemes.FILLED}
                                        onClick={() => {deleteCourseModalOpenHandler();}}>
                                        Delete course</Button>
                                    <DeleteModal itemName={course?.title} deleteIsOpen={deleteCourseModalOpen}
                                        deleteOpenHandler={deleteCourseModalOpenHandler}
                                        deleteFunc={deleteCourseHandler}
                                    />
                                </>
                            )}
                        </div>
                    </>
                    <Modal isOpen={editModalOpen} setIsOpen={openEditHandler}>
                        <CourseForm
                            courseData={course}
                            onSubmit={updateCourseHandler}
                            isCreating={false}
                        />
                    </Modal>
                </div>
            </div>

            <div className={"ml-5"}>
                <Image
                    src={course?.cover_image}
                    alt={"image"}
                    className={"hidden md:block md:max-w-[320px] lg:max-w-[430px] xl:lg:max-w-[550px] object-cover"}
                    width={500}
                    height={350}
                />
            </div>
        </div>
    );
};

export default CourseHeader;
