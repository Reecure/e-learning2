import {ComponentRender} from "@/shared/config/test/test-utils";
import {Label} from "@/shared/ui";

describe("Label", () => {
    test("renders Label with children", () => {
        const {getByTestId, getByText} = ComponentRender(
            <Label htmlFor={"test"} labelText={"Test"}>
                <span>Child Element</span>
            </Label>
        );

        const label = getByTestId("label");
        const childElement = getByText("Child Element");

        expect(label).toBeInTheDocument();
        expect(childElement).toBeInTheDocument();
        expect(label).toContainElement(childElement);
    });
});