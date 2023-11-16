import {FC, useState} from "react";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {AiOutlineUser} from "react-icons/ai";
import Link from "next/link";
import ThemeToggle, {Themes} from "../../../../ThemeTogler/ui/ThemeToggle";
import {signOut, useSession} from "next-auth/react";
import {Button} from "@/shared/ui";
import Menu from "@/shared/ui/Menu/Menu";
import {Routes} from "@/shared/config/routes";

interface Props {
    theme: Themes;
    toggleTheme: () => void;
}

const Links = [
    {
        title: "Profile",
        href: Routes.USER_PROFILE
    },
    {
        title: "My courses",
        href: Routes.USER_COURSE_PAGE
    },

];

const NavbarMenu: FC<Props> = ({toggleTheme, theme}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {status} = useSession();
    return (
        <Menu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            buttonChildren={
                <Button
                    theme={ButtonThemes.CLEAR}
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                    }}
                    className={
                        "text-2xl flex justify-center !px-[10px] !py-[8px] rounded-md items-center hover:bg-light-primary-main/10 dark:hover:bg-dark-primary-main/10 z-[1]"
                    }
                >
                    <AiOutlineUser/>
                </Button>
            }
            className={"!right-0 !py-3 "}
        >
            <div className={"flex flex-col gap-y-1 items-start"}>
                {status === "authenticated" && (
                    <>
                        {
                            Links.map(link => {
                                return <div key={link.title}>
                                    <Link href={link.href} className={"hover:opacity-70"}
                                        onClick={() => {
                                            setMenuOpen(!menuOpen);
                                        }}
                                    >
                                        {link.title}
                                    </Link>
                                </div>;
                            })
                        }
                    </>
                )}
                <div className={"flex justify-between items-center w-full"}>
                    <p>Theme</p>
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme}/>
                </div>
                <div
                    className={"w-full h-[1px] rounded-full bg-white mt-1 mb-[6px]"}
                ></div>
                {status === "unauthenticated" ? (
                    <Link href={"/auth/signin"}>Log in</Link>
                ) : (
                    <Button
                        theme={ButtonThemes.CLEAR}
                        onClick={() => {
                            signOut({callbackUrl: "/"});
                        }}
                        className={"!p-0"}
                    >
                        Log out
                    </Button>
                )}
            </div>
        </Menu>
    );
};

export default NavbarMenu;