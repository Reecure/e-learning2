import {type FC, type ReactNode, useEffect, useRef} from "react";

import {animated, useTransition} from "@react-spring/web";

type Props = {
    buttonChildren: ReactNode;
    className?: string;
    children: ReactNode | ReactNode[];
    menuOpen: boolean;
    setMenuOpen: (arg: boolean) => void;
};

const Menu: FC<Props> = ({
    children,
    setMenuOpen,
    menuOpen,
    buttonChildren,
    className,
}) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const outsideClickHandle = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };

        window.addEventListener("click", outsideClickHandle);

        return () => {
            window.removeEventListener("click", outsideClickHandle);
        };
    }, []);

    const anim = useTransition(menuOpen, {
        from: {
            transform: "translateY(-10px)",
            opacity: 0,
        },
        enter: {
            transform: "translateY(0px)",
            opacity: 1,
        },
        leave: {
            transform: "translateY(-10px)",
            opacity: 0,
        },
        config: {
            duration: 100,
        },
    });

    return (
        <div ref={menuRef} className={"relative z-40"}>
            {buttonChildren}
            {anim((style, open) =>
                open ? (
                    <animated.div
                        style={style}
                        className={`${className} absolute top-12 right-5 py-1 min-w-[150px] px-3 bg-light-primary-container dark:bg-dark-primary-container rounded-md`}
                    >
                        {children}
                    </animated.div>
                ) : null,
            )}
        </div>
    );
};

export default Menu;
