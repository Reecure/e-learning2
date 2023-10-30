import type {AppProps} from "next/app";
import {trpc} from "@/shared/utils/trpc";
import {SessionProvider} from "next-auth/react";
import {type FC, type ReactElement, type ReactNode, useEffect, useState} from "react";
import {type NextPage} from "next";
import {ReduxProvider} from "@/app/ReduxProvider";
import "@/app/styles/globals.css";
import {useRouter} from "next/router";
import {Loader} from "@/shared/ui";
import {appWithTranslation} from "next-i18next";


export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const App: FC<AppPropsWithLayout> = ({Component, pageProps}) => {
    const getLayout = Component.getLayout ?? (page => page);
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const hadleStart = (url: string) => (url !== router.asPath) && setLoading(true);
        const hadleComplete = (url: string) => (url !== router.asPath) && setTimeout(() => setLoading(false), 500);

        router.events.on("routeChangeStart", hadleStart);
        router.events.on("routeChangeComplete", hadleComplete);
        router.events.on("routeChangeError", hadleComplete);

        return () => {
            router.events.off("routeChangeStart", hadleStart);
            router.events.off("routeChangeComplete", hadleComplete);
            router.events.off("routeChangeError", hadleComplete);
        };
    }, [loading]);

    if (loading) {
        return <div className={"bg-light-background dark:bg-dark-background h-screen w-screen flex justify-center items-center"}><Loader /></div>;
    }

    return (
        <ReduxProvider>
            <SessionProvider session={pageProps.session}>
                {getLayout(<Component {...pageProps} />)}
            </SessionProvider>
        </ReduxProvider>
    );
};

export default trpc.withTRPC(appWithTranslation(App));