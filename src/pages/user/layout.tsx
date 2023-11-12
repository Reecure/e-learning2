import {type FC, type ReactNode, Suspense, useState} from "react";
import {Routes} from "@/shared/config/routes";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {Button, ButtonThemes, Loader} from "@/shared/ui";
import {Sidebar} from "@/widgets/Sidebar";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";

type Props = {
    children: ReactNode | ReactNode[];
    contentClassName?: string;
};

const UserLayout: FC<Props> = ({children, contentClassName}) => {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const session = useSession({
        required: true,
        onUnauthenticated() {
            router.push(Routes.LOGIN);
        },
    });

    const openSidebarHandler = () => {
        setSidebarOpen(prev => !prev);
    };

    if (session.status === "loading") {
        return <Loader/>;
    }

    return (
        <Suspense fallback={<Loader/>}>
            <div className={"relative h-[calc(100vh_-_62px)] flex justify-between"}>
                {
                    sidebarOpen && <Sidebar/>
                }
                <Button theme={ButtonThemes.FILLED} onClick={openSidebarHandler}
                    className={`absolute bottom-0 ${sidebarOpen ? "left-14 md:left-20" : "left-0"} duration-200 transition-all !p-4 z-[99] md:z-[199]`}>
                    {
                        sidebarOpen ? <AiOutlineLeft/> : <AiOutlineRight/>
                    }
                </Button>
                <div className={`w-full overflow-y-auto p-5 ${contentClassName} `}>
                    {children}
                </div>
            </div>
        </Suspense>
    );
};

export default UserLayout;
