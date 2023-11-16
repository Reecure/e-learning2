import {ComponentRender} from "@/shared/config/test/test-utils";
import InstructionDescription from "@/shared/ui/InstructionForUser/InstructionDescription";

const mockItem = {
    title: "Test",
    paragraph: ["Paragraph 1", "Paragraph 2"]
};
describe("InstructionDescription", () => {
    test("", () => {
        const {getByText} = ComponentRender(<InstructionDescription item={mockItem}/>);

        const itemTitle = getByText("Test");

        expect(itemTitle).toBeInTheDocument();
        mockItem.paragraph.forEach((paragraph) => {
            expect(getByText(paragraph)).toBeInTheDocument();
        });

    });
});