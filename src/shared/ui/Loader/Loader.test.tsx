import {ComponentRender} from "@/shared/config/test/test-utils";
import {Loader} from "@/shared/ui";

describe("Loader", () => {
    test("renders Loader", () => {
        const {getByTestId} = ComponentRender(<Loader/>);

        const loader = getByTestId("loader");

        expect(loader).toBeInTheDocument();
    });
});