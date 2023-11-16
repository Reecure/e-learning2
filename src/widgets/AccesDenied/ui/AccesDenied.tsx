import {type FC} from "react";


type Props = Record<string, unknown>;

const AccessDenied: FC<Props> = () => {
    return(
        <div data-testid="access-denied" className={"w-full h-full flex justify-center items-center"}>
            <p className={"text-5xl"}>Access denied</p>
        </div>);
};

export default AccessDenied;
