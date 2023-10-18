import {FC} from "react";

interface Props {
}

const FavoriteCourse: FC<Props> = () => {

    return (
        <div className={"w-[470px] h-[250px] border-2 border-dark-primary-main rounded-md"}>
            <p>Favorite course</p>
        </div>
    );
};

export default FavoriteCourse;