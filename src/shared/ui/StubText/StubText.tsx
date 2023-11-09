import React, {FC} from "react";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";

interface Props {
    title: string,
    link?: string
}

const StubText: FC<Props> = ({link, title}) => {

    return (
        <>
            <p className={"text-xl font-bold mb-4"}>{title}</p>
            <Link href={Routes.COURSES} className={"text-sm underline text-blue-400"}>{link}</Link>
        </>
    );
};

export default StubText;