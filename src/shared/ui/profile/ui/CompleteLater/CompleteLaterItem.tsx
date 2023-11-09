import React, {FC} from "react";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {Button, ButtonThemes} from "@/shared/ui";
import {AiOutlineClose} from "react-icons/ai";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";

interface Props {
    lesson: {
        lesson_name: string,
        complete_date: Date,
        read_later: boolean | null,
        is_completed: boolean,
        lessonType: string,
        module_id: string,
        lesson_id: string,
        quizScore: number
    };
}

const CompleteLaterItem: FC<Props> = ({lesson}) => {
    const utils = trpc.useContext();
    const session = useSession();

    const updateLessonProgress = trpc.progress.updateUserLessonsProgress.useMutation({
        async onSuccess() {
            await utils.progress.getUserLessonsProgressById.invalidate();
            await utils.progress.getUserReadLaterLessons.invalidate();
        }
    });

    const userProgressOnLesson = trpc.progress.getUserLessonsProgressById.useQuery({
        id: session.data?.user.id || "",
        lesson_id: lesson.lesson_id,
    });

    const setReadLaterHandler = () => {
        try {
            updateLessonProgress.mutate({
                id: session.data?.user.id || "",
                lesson_progress: {
                    lesson_id: userProgressOnLesson && userProgressOnLesson.data?.lesson_id || "",
                    module_id: userProgressOnLesson && userProgressOnLesson.data?.module_id || "",
                    complete_date: userProgressOnLesson && userProgressOnLesson.data?.complete_date || new Date(),
                    lesson_name: userProgressOnLesson && userProgressOnLesson.data?.lesson_name || "",
                    is_completed: userProgressOnLesson && userProgressOnLesson.data?.is_completed || false,
                    quizScore: userProgressOnLesson && userProgressOnLesson.data?.quizScore || 0,
                    lessonType: userProgressOnLesson && userProgressOnLesson.data?.lessonType || "",
                    read_later: false
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Link
                href={`${Routes.USER_COURSE_PAGE_LESSONS}/${lesson.module_id}`}>{lesson.lesson_name.length > 35 ? lesson.lesson_name.slice(0, 35) + "..." : lesson.lesson_name}</Link>
            <Button type={"submit"} theme={ButtonThemes.TEXT} className={"!p-1 sm:!p-2 !rounded-md"}
                onClick={setReadLaterHandler}><AiOutlineClose/></Button>
        </>
    );
};

export default CompleteLaterItem;