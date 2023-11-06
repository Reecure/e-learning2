import {type FC, type ReactNode} from "react";

type Props = {
    htmlFor: string;
    labelText: string;
    children: ReactNode | ReactNode[];
};

const Label: FC<Props> = ({labelText, children, htmlFor}) => (
    <label htmlFor={htmlFor} className={"relative"}>
        <p
            className={
                "mb-1 text-sm  dark:text-neutral-300 whitespace-nowrap"
            }
        >
            {labelText}
        </p>
        {children}
    </label>
);

export default Label;
