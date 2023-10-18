import {type FC} from "react";

type Props = {
    error?: boolean;
    text: string;
};

const Text: FC<Props> = ({text, error}) => (
    <p
        data-testid={"text"}
        className={`${
            error ? "text-light-error-main dark:text-dark-error-main" : ""
        }`}
    >
        {text}
    </p>
);

export default Text;
