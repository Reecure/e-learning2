import {type FC} from "react";
import {ICodeBlock} from "@/enteties/Lesson";
import SyntaxHighlighter from "react-syntax-highlighter";
import {oneDark} from "react-syntax-highlighter/dist/cjs/styles/prism";

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
