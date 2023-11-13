import {type FC} from "react";
import {ITextBlock} from "@/enteties/Lesson";


type Props = {
    textBlock: ITextBlock
};

const TextBlock: FC<Props> = ({textBlock}) => (
    <div>
        <h5 className={"text-2xl font-semibold my-5"}>{textBlock?.title}</h5>
        <p>
            {textBlock?.paragraphs.map(paragraph => (
                <p className={"mb-5 "} key={paragraph.id}>
                    {paragraph.text}
                </p>
            ))}
        </p>
    </div>
);

export default TextBlock;
