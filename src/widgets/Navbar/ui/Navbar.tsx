import {type FC, useState} from "react";
import Link from "next/link";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {GiHamburgerMenu} from "react-icons/gi";
import logo from "@/shared/assets/Logo.png";
import Image from "next/image";
import {Links} from "@/widgets/Navbar/model/Links";
import NavbarMenu from "@/widgets/Navbar/ui/NavbarComponents/NavbarMenu/NavbarMenu";
import {useSession} from "next-auth/react";
import NavbarHamburger from "@/widgets/Navbar/ui/NavbarComponents/NavbarHamburger/NavbarHamburger";
import {Button} from "@/shared/ui";
import {Themes} from "@/widgets/ThemeTogler";
import {useTranslation} from "next-i18next";


type Props = {
    className?: string;
    theme: Themes;
    toggleTheme: () => void;
};

const Navbar: FC<Props> = ({className, theme, toggleTheme}) => {

    const {t} = useTranslation('navbar');

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const {status} = useSession();
    const openHamburgerHandler = () => {
        setHamburgerOpen(prev => !prev);
    };

    return (
        <nav
            data-testid={"navbar"}
            className={`${className} bg-light-background dark:bg-dark-background text-primary-light border-b-[2px] border-black text-light-text dark:text-dark-text flex justify-between items-center
            px-5 sm:px-7 md:px-10 lg:px-16 xl:px-20 py-2 z-[12]
            `}
        >
            <div className={"flex items-center sm:gap-5"}>
                <Image src={logo} alt={"logo"} className={"w-8 h-8 sm:w-10 sm:h-10"}/>
                <Button theme={ButtonThemes.CLEAR} onClick={() => {
                    openHamburgerHandler();
                }} className={"text-2xl sm:hidden"}>

                    {!hamburgerOpen && <GiHamburgerMenu/>}

                </Button>
                <ul className='hidden sm:flex text-lg space-x-4 font-bold'>
                    {
                        Links.map(item => !item.protected && <li key={item.link} className={""}>
                            {<Link
                                href={item.link}
                            >
                                {t(item.name)}
                            </Link>}
                        </li>)
                    }
                </ul>
            </div>

            {hamburgerOpen && <NavbarHamburger openHamburgerHandler={openHamburgerHandler}/>}

            <div className={"flex items-center"}>
                {status === "unauthenticated" ? (
                    <Link href={"/auth/signin"}>{t('login')}</Link>
                ) : null}
                <NavbarMenu theme={theme} toggleTheme={toggleTheme}/>
            </div>
        </nav>
    );
};

export default Navbar;
