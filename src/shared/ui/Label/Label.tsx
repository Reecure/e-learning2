import {type FC, type ReactNode} from "react";

type Props = {
    htmlFor: string;
    labelText: string;
    children: ReactNode | ReactNode[];
    textColor?: string
};

const Label: FC<Props> = ({textColor, labelText, children, htmlFor}) => (
    <label data-testid={"label"} htmlFor={htmlFor} className={"relative"}>
        <p
            className={
                `${textColor} mb-1 text-sm  dark:text-neutral-300 whitespace-nowrap`
            }
        >
            {labelText}
        </p>
        <>
            {children}
        </>

    </label>
);

export default Label;
