import {fireEvent, screen, waitFor} from "@testing-library/react";
import {ComponentRender} from "@/shared/config/test/test-utils";
import CreateNewsForm from "@/shared/ui/News/CreateNewsForm";

const mockSubmit = jest.fn();
describe("CreateNewsForm", () => {
    test("submits the form with valid data", async () => {
        ComponentRender(<CreateNewsForm onSubmit={mockSubmit}/>);

        fireEvent.change(screen.getByTestId("title"), {target: {value: "Test Title"}});
        fireEvent.change(screen.getByTestId("description"), {target: {value: "Test Description"}});

        fireEvent.click(screen.getByTestId("submit"));

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith({
                title: "Test Title",
                description: "Test Description",
            });
        });
    });
});