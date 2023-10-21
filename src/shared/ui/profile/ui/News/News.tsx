import {FC} from "react";
import NewsItem from "@/shared/ui/profile/ui/News/NewsItem/NewsItem";

interface Props {
}

const News: FC<Props> = () => {

    return (
        <div className={"w-[350px] h-full border-2 border-dark-primary-main rounded-md  "}>
            <div className={"px-3 py-2 text-lg text-center border-b-2 border-dark-primary-main text-neutral-300 font-extrabold"}>News</div>
            <div className={"px-2 py-3 h-[620px] overflow-y-auto"}>
                {
                    Array(10).fill(null).map((item, i) => {
                        return <NewsItem key={i} />;
                    })
                }
            </div>
        </div>
    );
};

export default News;