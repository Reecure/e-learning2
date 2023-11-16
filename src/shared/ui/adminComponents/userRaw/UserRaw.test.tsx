import {ComponentRender} from "@/shared/config/test/test-utils";
import {UserRaw} from "@/shared/ui";
import {UserRoles} from "@/enteties/User";
import {mockUser} from "@/server/routers/user/user.test";


describe("UserRaw", () => {
    test("renders UserRaw", () => {
        const {getByText} = ComponentRender(<UserRaw user={mockUser} index={1}/>);

        expect(getByText(mockUser.firstname)).toBeInTheDocument();
        expect(getByText(mockUser.lastname)).toBeInTheDocument();
        expect(getByText(mockUser.email)).toBeInTheDocument();
        expect(getByText(UserRoles.ADMIN)).toBeInTheDocument();

    });
});