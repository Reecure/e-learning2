import {FC} from "react";

interface Props {
    className?: string
}

const NewsItem: FC<Props> = ({className}) => {

    return (
        <div className={`${className} w-full rounded-md px-2 py-4 mb-2`}>
            <p>We add new Course!!!</p>
        </div>
    );
};

export default NewsItem;