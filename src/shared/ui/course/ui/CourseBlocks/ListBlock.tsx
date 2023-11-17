import {FC} from "react";
import {IListBlock} from "@/enteties/Lesson/model/types/lesson";

interface Props {
    listBlock: IListBlock;
}

const ListBlock: FC<Props> = ({listBlock}) => {

    return (
        <div>
            <h5 className={"text-md my-5"}>{listBlock?.title}</h5>
            <ul className={"list-disc list-inside ml-5"}>
                {listBlock?.listItems.map(item => (
                    <li key={item.id} className={"mb-2"}>
                        {item.item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListBlock;