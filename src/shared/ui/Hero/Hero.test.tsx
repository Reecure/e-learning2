import {ComponentRender} from "@/shared/config/test/test-utils";
import {Hero} from "@/shared/ui";

describe("Hero", () => {
    test("renders Hero", () => {
        const {getByTestId} = ComponentRender(<Hero/>);

        const item = getByTestId("hero");

        expect(item).toBeInTheDocument();

    });
});