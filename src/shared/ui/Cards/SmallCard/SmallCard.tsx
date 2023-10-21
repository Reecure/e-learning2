import {type FC,} from "react";
import Image from "next/image";
import {Button, ButtonThemes} from "@/shared/ui";
import {type Course} from "@/enteties/Course";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {BsClock, BsClockHistory} from "react-icons/bs";
import {CiBoxes} from "react-icons/ci";

type Props = {
    course: Course;
};

const SmallCard: FC<Props> = ({course}) => {
    return (
        <Link href={`${Routes.USER_COURSE_PAGE}/${course?.id}`}
            className={
                "flex flex-col bg-dark-neutral-100 p-5 rounded-2xl min-w-[250px] max-w-[340px] sm:w-[340px] h-[310px] hover:bg-dark-neutral-100/70 cursor-pointer"
            }
        >
            <div className={""}>
                <Image
                    src={course?.cover_image}
                    width={300}
                    height={300}
                    alt={"card-image"}
                    className={"max-w-[300px] max-h-[100px] w-full h-full object-cover rounded-2xl"}
                />
            </div>
            <div className={" max-w-[300px] flex flex-col justify-between"}>
                <div className={"flex justify-between my-4 text-neutral-400 text-sm"}>
                    <div  className={"flex items-center gap-1 "}>
                        <CiBoxes />
                        <p className={""}>Programming</p>
                    </div>
                    <div className={"flex items-center gap-1 "}>
                        <BsClock />
                        <p className={""}>{course.duration}</p>
                    </div>
                </div>
                <h4 className={"font-bold mb-1 text-2xl mb-5"}>{course?.title?.slice(0, 20)}</h4>
                <p className={"text-sm text-neutral-400 mb-5"}>{course?.cover_description?.slice(0, 90)}...</p>
            </div>
        </Link>
    );
};

export default SmallCard;
