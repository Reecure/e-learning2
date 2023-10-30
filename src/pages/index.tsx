import Layout from "@/pages/layout";
import {ReactElement} from "react";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {Button, ButtonThemes} from "@/shared/ui";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

type Props = {
};

const Home = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { t, i18n } = useTranslation();

    const {locale, locales, push} = useRouter();

    const handleClick = (l: string) => () => {
        push("/", undefined, {locale: l});
    };

    return (

        <div>
            <h1 className={"text-xl mb-5"}> locale: {locale}</h1>
            {locales?.map(l => {
                return <Button theme={ButtonThemes.TEXT} key={l} onClick={handleClick(l)}>{l}</Button>;
            })}
        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps<Props> = async ({
    locale,
}) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', [
            'common',
            'navbar'
        ])),
    },
});
export default Home;