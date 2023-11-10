import {type FC} from "react";

export enum BadgeColors {
    GREEN = " !bg-green-200 dark:!bg-green-700/40 !text-green-700  dark:!text-green-400",
    YELLOW = " !bg-yellow-200 dark:!bg-yellow-500/40 !text-yellow-500  dark:!text-yellow-200 ",
    RED = " !bg-red-400 dark:!bg-red-700/40 !text-red-700  dark:!text-red-400",
}

type Props = {
	color: BadgeColors;
	text: string;
    className?: string
};

const Badge: FC<Props> = ({color, text, className}) => (
    <div
        className={`${color} ${className} px-3 py-1 max-w-min rounded-full text-white mb-3`}
    >
        <p>{text}</p>
    </div>
);

export default Badge;
