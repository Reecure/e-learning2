import {FC} from "react";

interface Props {
    width?: number,
    height?: number
}

const Skeleton: FC<Props> = ({height = 0, width = 0}) => {

    return (
        <div
            style={{
                width: width !== 0 ? `${width}px` : "100%",
                height: height !== 0 ? `${height}px` : "100%",
            }}
            className={"bg-neutral-200 dark:bg-neutral-600 animate-pulse rounded-md"}
        ></div>
    );
};

export default Skeleton;