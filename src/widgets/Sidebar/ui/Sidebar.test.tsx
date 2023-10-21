import {ComponentRender} from "@/shared/config/test/test-utils";
import {Sidebar} from "@/widgets/Sidebar";
import {screen} from "@testing-library/react";

describe("Sidebar", () => {
    test("Sidebar rendered", () => {
        ComponentRender(<Sidebar/>);
        const sidebarEl = screen.getByTestId("sidebar");

        expect(sidebarEl).toBeInTheDocument();
    });
});