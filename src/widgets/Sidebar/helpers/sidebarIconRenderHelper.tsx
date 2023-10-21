import {IconType} from "react-icons";
import {AiOutlineUser} from "react-icons/ai";
import {PiCertificateBold, PiStudentDuotone} from "react-icons/pi";
import {RiAdminLine} from "react-icons/ri";

export const sidebarIconRenderHelper = (icon: IconType) => {
    switch (icon) {
    case AiOutlineUser:
        return <AiOutlineUser/>;
    case PiStudentDuotone:
        return <PiStudentDuotone/>;
    case PiCertificateBold:
        return <PiCertificateBold/>;
    case RiAdminLine:
        return <RiAdminLine/>;
    }
};