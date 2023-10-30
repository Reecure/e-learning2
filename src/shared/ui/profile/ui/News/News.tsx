import {FC} from "react";
import NewsItem from "@/shared/ui/profile/ui/News/NewsItem/NewsItem";

interface Props {
}

const News: FC<Props> = () => {

    return (
        <div className={"w-[350px] h-full"}>
            <div className={"px-3 py-2 text-lg text-center bg-dark-neutral-300 rounded-t-md text-neutral-300 font-extrabold"}>News</div>
            <div className={"px-2 py-3  h-[655px]  overflow-y-auto border-[1px] border-dark-primary-main/20 rounded-b-md"}>
                {
                    Array(20).fill(null).map((item, i) => {
                        return <NewsItem className={"odd:bg-dark-primary-main/30 even:bg-dark-primary-main/20"} key={i} />;
                    })
                }
            </div>
        </div>
    );
};

export default News;