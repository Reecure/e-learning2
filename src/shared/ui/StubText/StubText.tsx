import React, {FC} from "react";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";

interface Props {
    title: string,
    linkText?: string
}

const StubText: FC<Props> = ({linkText, title}) => {

    return (
        <>
            <p className={"text-xl font-bold mb-4"}>{title}</p>
            <Link href={Routes.COURSES} className={"text-sm underline text-blue-400"}>{linkText}</Link>
        </>
    );
};

export default StubText;