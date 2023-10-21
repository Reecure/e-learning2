import {Routes} from "@/shared/config/routes";
import {IconType} from "react-icons";
import {AiOutlineUser} from "react-icons/ai";
import {PiCertificateBold, PiStudentDuotone} from "react-icons/pi";
import {RiAdminLine} from "react-icons/ri";
import {UserRoles} from "@/enteties/User";

interface ISidebarLinks {
    href: Routes,
    icon: IconType,
    role: UserRoles
}

export const sidebarLinks: ISidebarLinks[] = [
    {
        href: Routes.USER_PROFILE,
        icon: AiOutlineUser,
        role: UserRoles.USER
    },
    {
        href: Routes.USER_COURSES,
        icon: PiStudentDuotone,
        role: UserRoles.USER
    },
    {
        href: Routes.USER_GRADES,
        icon: PiCertificateBold,
        role: UserRoles.USER
    },
    {
        href: Routes.ADMIN_PANEL,
        icon: RiAdminLine,
        role: UserRoles.ADMIN
    },
];