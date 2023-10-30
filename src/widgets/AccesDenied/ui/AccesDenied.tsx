import {type FC} from "react";
import {useTranslation} from "next-i18next";

type Props = Record<string, unknown>;

const AccessDenied: FC<Props> = () => {
    const {t} = useTranslation('common');

    return(
        <div className={"w-full h-full flex justify-center items-center"}>
            <p className={"text-5xl"}>{t('access_denied')}</p>
        </div>);
};

export default AccessDenied;
