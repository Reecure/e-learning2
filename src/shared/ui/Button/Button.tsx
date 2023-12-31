import {type ButtonHTMLAttributes, type FC, type ReactNode} from "react";

export enum ButtonThemes {
    FILLED = "bg-light-primary-main/80 lg:bg-light-primary-main text-light-gray dark:bg-dark-primary-main lg:dark:hover:dark:bg-dark-primary-main/80 dark:text-dark-primary-container",
    OUTLINED = "border-[1px] border-light-neutral-300 lg:hover:bg-light-primary-main/10 lg:dark:hover:bg-dark-primary-main/10 text-light-primary-main dark:text-light-primary-container dark:border-light-neutral-600 bg-transparent",
    ELEVATED = "text-light-primary-main dark:text-light-primary-container lg:hover:bg-light-primary-main/10 lg:dark:hover:bg-dark-primary-main/10 shadow-[3px_3px_10px_2px_rgba(0,0,0,0.2)] dark:bg-dark-neutral-100",
    FILLED_TONAL = "bg-light-secondary-container/60 dark:bg-dark-secondary-container/60 lg:hover:bg-light-secondary-container lg:dark:hover:bg-dark-secondary-container text-light-secondary-container-hover dark:text-dark-secondary-container-hover",
    TEXT = "text-light-primary-main dark:text-light-primary-container lg:hover:bg-light-primary-main/10 lg:dark:hover:bg-dark-primary-main/10",
    CLEAR = "",
}

type Props = {
    children: ReactNode;
    theme: ButtonThemes;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({
    children,
    className,
    theme = ButtonThemes.FILLED,
    ...otherProps
}) => (
    <button
        data-testid={"button"}
        type={"button"}
        className={`${theme} px-6 py-[10px] ${className}  rounded-md duration-200  disabled:opacity-50 xl:active:scale-95`}
        {...otherProps}
    >
        {children}
    </button>
);

export default Button;
