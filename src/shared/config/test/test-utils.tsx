import {render} from "@testing-library/react";
import {ReactNode} from "react";
import {ReduxProvider} from "@/app/ReduxProvider";
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";
import {UserRoles} from "@/enteties/User";

const mockSession: Session = {
    user: {
	 	name: "",
        role: UserRoles.USER,
        id: "",
        email: "",
        image: ""
    },
};

export function ComponentRender(component: ReactNode) {

    return render(
        <>
            <SessionProvider session={mockSession}>
                <ReduxProvider>
                    {component}
                </ReduxProvider>
            </SessionProvider>
        </>
    );
}