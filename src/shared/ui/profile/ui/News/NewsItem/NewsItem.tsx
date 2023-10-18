import {FC} from "react";

interface Props {
}

const NewsItem: FC<Props> = () => {

    return (
        <div className={"w-full border-2 rounded-md border-dark-primary-main px-2 py-4 mb-2"}>
            <p>We add new Course!!!</p>
        </div>
    );
};

export default NewsItem;