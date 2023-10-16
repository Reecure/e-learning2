import {type ReactElement} from "react";
import Layout from "@/pages/layout";
import Link from "next/link";


const Custom404 = () => (
    <div className="flex flex-col items-center justify-center h-screen text-center">
        <Link href="/" className="text-gray-300 underline">
            Home
        </Link>
        <div className="flex flex-col">
            <h1 className="text-9xl font-bold">404</h1>
            <h2 className="text-4xl font-bold">Page not found</h2>
        </div>
    </div>
);

Custom404.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Custom404;
