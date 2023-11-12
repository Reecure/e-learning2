import {type FC} from "react";
import {ICodeBlock} from "@/enteties/Lesson";
import SyntaxHighlighter from "react-syntax-highlighter";
import {oneDark} from "react-syntax-highlighter/dist/cjs/styles/prism";


const theme = {
    // keyword: "green",
    // identifier: "blue",
    // string: "red",
    // className: "bg-neutral-600"
};

type Props = {
    codeBlock: ICodeBlock
};

const CodeBlock: FC<Props> = ({codeBlock}) => {

    return (
        <SyntaxHighlighter
            style={oneDark}
            language={"javascript"}
            showLineNumbers={true}
            useInlineStyles={true}
        >
            {codeBlock.code}
        </SyntaxHighlighter>
    );
};

export default CodeBlock;
