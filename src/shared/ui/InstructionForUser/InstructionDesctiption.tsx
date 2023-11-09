import {FC} from "react";

interface Props {
    item: {
        title: string,
        paragraph: string[]
    };
}

const InstructionDesctiption: FC<Props> = ({item}) => {

    return (
        <>
            <h5 className={"text-3xl mb-5"}>{item.title}</h5>
            <ul className={"flex flex-col gap-3 text-lg"}>
                {
                    item.paragraph.map((paragraph, i) => (
                        <li key={i}>{paragraph}</li>
                    ))
                }
            </ul>
        </>
    );
};

export default InstructionDesctiption;