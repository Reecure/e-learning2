import type {DocumentProps} from "next/document";
import Document, {Head, Html, Main, NextScript,} from "next/document";

type Props = DocumentProps & {
    // add custom document props
}
class MyDocument extends Document<Props> {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
