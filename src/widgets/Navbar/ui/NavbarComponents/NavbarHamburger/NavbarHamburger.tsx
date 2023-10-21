import {FC} from "react";
import Image from "next/image";
import logo from "@/shared/assets/Logo.png";

import {ButtonThemes} from "@/shared/ui";
import {AiOutlineClose} from "react-icons/ai";
import {Links} from "@/widgets/Navbar/model/Links";
import Link from "next/link";
import {Button} from "@/shared/ui";

interface Props {
    openHamburgerHandler: () => void
}

const NavbarHamburger: FC<Props> = ({openHamburgerHandler}) => {

    return (
        <div data-testid={"navbarHamburger"}
            className={"fixed top-0 bottom-0 right-0 left-0 cursor-pointer z-[1000] bg-black/40"}
            onClick={openHamburgerHandler}>
            <ul className='absolute flex flex-col bg-light-background dark:bg-dark-background h-screen px-5 py-5 space-y-3 w-[200px] z-[1011]'
                onClick={e => {
                    e.stopPropagation();
                }}>
                <div className={"flex justify-between items-center text-2xl mb-6"}>
                    <Image src={logo} alt={"logo"} className={"w-8 h-8"}/>
                    <Button theme={ButtonThemes.CLEAR} className={"!p-0"}
                        onClick={openHamburgerHandler}><AiOutlineClose/></Button>

                </div>

                {
                    Links.map(item => <li key={item.link}>
                        {!item.protected && <Link
                            href={item.link}
                            className='uppercase font-bold'
                            onClick={openHamburgerHandler}
                        >
                            {item.name}
                        </Link>}
                    </li>)
                }
            </ul>
        </div>
    );
};

export default NavbarHamburger;