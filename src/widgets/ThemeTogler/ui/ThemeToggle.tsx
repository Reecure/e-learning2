import {type FC} from "react";
import {Button, ButtonThemes} from "@/shared/ui";

type Props = {
    theme: Themes;
    toggleTheme: () => void;
};

export enum Themes {
    LIGHT = "light",
    DARK = "dark",
}

const ThemeToggle: FC<Props> = ({theme, toggleTheme}) => (
    <Button
        data-testid="ThemeToggle"
        theme={ButtonThemes.CLEAR}
        className={
            "!w-[24px] !h-[14px] !p-0 relative bg-light-primary-main dark:bg-dark-primary-main rounded-full"
        }
        onClick={toggleTheme}
    >
        <span
            className={
                "w-2 h-2 absolute top-[3px] left-[3px] rounded-full bg-light-gray dark:bg-dark-primary-container dark:left-[13px] transition-all duration-200"
            }
        ></span>
    </Button>
);

export default ThemeToggle;
