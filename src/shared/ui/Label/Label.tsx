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
				"absolute text-[12px] -top-[18px] left-4 bg-light-background dark:bg-dark-background px-1 whitespace-nowrap"
			}
		>
			{labelText}
		</p>
		{children}
	</label>
);

export default Label;
