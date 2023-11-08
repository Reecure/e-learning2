import {FC} from "react";
import {News} from "@/enteties/News/model/types/module";

interface Props {
    className?: string;
    item: News;
}

const NewsItem: FC<Props> = ({className, item}) => {

    return (
        <div className={`${className} w-full rounded-md px-2 py-4 mb-2`}>
            <p>{item.title}</p>
        </div>
    );
};

export default NewsItem;