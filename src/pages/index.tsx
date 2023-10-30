import Layout from "@/pages/layout";
import {ReactElement} from "react";
import {useTranslation} from "next-i18next";
import {useRouter} from "next/router";
import {Button, ButtonThemes} from "@/shared/ui";

const Home = () => {
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

            <p>{t('h1')}</p>

        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default Home;