import {RxExit} from "react-icons/rx";
import {signOut, useSession} from "next-auth/react";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {sidebarLinks} from "@/widgets/Sidebar/model/sidebarLinks";
import Link from "next/link";
import {sidebarIconRenderHelper} from "@/widgets/Sidebar/helpers/sidebarIconRenderHelper";
import {UserRoles} from "@/enteties/User";
import {Button} from "@/shared/ui";


const Sidebar = () => {
    const session = useSession();

    return (
        <aside
            data-testid={"sidebar"}
            className={
                "py-5 w-14 sm:w-16 md:w-20 flex justify-between flex-col items-center border-r-2 text-2xl border-black"
            }
        >
            <div className={"flex flex-col items-center gap-y-5 w-20 "}>
                {
                    sidebarLinks.map(link => {
                        if (link.role === UserRoles.USER) {
                            return <Link href={link.href} key={link.href}
                                className={"hover:opacity-70 hover:scale-[1.2]"}>{sidebarIconRenderHelper(link.icon)}</Link>;
                        } else if (link.role === session.data?.user.role || UserRoles.ADMIN) {
                            return <Link href={link.href} key={link.href}
                                className={"hover:opacity-70 hover:scale-[1.2]"}>{sidebarIconRenderHelper(link.icon)}</Link>;
                        } else {
                            return null;
                        }
                    })
                }
            </div>
            <Button
                theme={ButtonThemes.TEXT}
                className={"!p-2 rounded-lg"}
                onClick={() => {
                    signOut({callbackUrl: "/"});
                }}
            >
                <RxExit/>
            </Button>
        </aside>
    );
};

export default Sidebar;
