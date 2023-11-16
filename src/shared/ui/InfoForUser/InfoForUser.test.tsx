import {ComponentRender} from "@/shared/config/test/test-utils";
import InfoForUser from "./InfoForUser";

describe("InfoForUser", () => {
    test("renders InfoForUser SUCCESS", () => {
        const {getByText} = ComponentRender(<InfoForUser text={"Text"} isSuccess/>);

        const item = getByText("Text");

        expect(item).toBeInTheDocument();
        expect(item).toHaveClass("border-green-700 bg-green-700/10");

    });
    test("renders InfoForUser NOT SUCCESS", () => {
        const {getByText} = ComponentRender(<InfoForUser text={"Text"} isSuccess={false}/>);

        const item = getByText("Text");

        expect(item).toBeInTheDocument();
        expect(item).toHaveClass("border-dark-error-main bg-dark-error-main/10");
    });
});