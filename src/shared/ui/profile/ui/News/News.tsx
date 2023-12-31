import React, {FC} from "react";
import {trpc} from "@/shared/utils/trpc";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";
import NewsItem from "@/shared/ui/profile/ui/News/NewsItem/NewsItem";


interface Props {
}

const emptyNews = <div className={"flex justify-center items-center w-full h-full text-2xl font-bold"}>
    There are no news
</div>;

const News: FC<Props> = () => {

    const news = trpc.news.getNews.useQuery();

    if (news.isLoading) {
        return <Skeleton width={350}/>;
    }


    return (
        <div className={"max-w-[340px] h-full"}>
            <div
                className={"px-3 py-2 text-lg text-center bg-neutral-200 dark:bg-neutral-800 text-black rounded-t-md dark:text-neutral-300 font-extrabold"}>
                News
            </div>
            <div
                className={"px-2 py-3  h-[655px]  overflow-y-auto border-[1px] border-dark-primary-main/20 rounded-b-md"}>
                {
                    news.data?.length === 0 ? emptyNews :
                        news.data?.map((item, i) => {
                            return <NewsItem item={item}
                                className={"odd:bg-dark-primary-main/30 even:bg-dark-primary-main/20"}
                                key={i}/>;
                        })
                }
            </div>
        </div>
    );
};

export default News;