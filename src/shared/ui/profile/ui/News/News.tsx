import {FC} from "react";
import NewsItem from "@/shared/ui/profile/ui/News/NewsItem/NewsItem";
import {trpc} from "@/shared/utils/trpc";
import {Loader} from "@/shared/ui";
import {News} from "@/shared/ui/course/ui/CreateNews/CreateNews";

interface Props {
}

const News: FC<Props> = () => {

    const news = trpc.news.getNews.useQuery();

    if (news.isLoading) {
        return <Loader/>;
    }

    return (
        <div className={"w-[350px] h-full"}>
            <div
                className={"px-3 py-2 text-lg text-center bg-dark-neutral-300 rounded-t-md text-neutral-300 font-extrabold"}>News
            </div>
            <div
                className={"px-2 py-3  h-[655px]  overflow-y-auto border-[1px] border-dark-primary-main/20 rounded-b-md"}>
                {
                    news.data?.map((item, i) => {
                        return <NewsItem item={item as News}
                            className={"odd:bg-dark-primary-main/30 even:bg-dark-primary-main/20"}
                            key={i}/>;
                    })
                }
            </div>
        </div>
    );
};

export default News;