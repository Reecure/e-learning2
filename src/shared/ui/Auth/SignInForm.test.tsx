import {ComponentRender} from "@/shared/config/test/test-utils";
import SignInForm from "@/shared/ui/Auth/SignInForm";
import {fireEvent, waitFor} from "@testing-library/react";

const mockSubmit = jest.fn();
describe("SignInForm", () => {
    test("renders SignInForm", async () => {
        const {getByTestId} = ComponentRender(<SignInForm/>);
        fireEvent.change(getByTestId("email"), {target: {value: "example@gamil.com"}});
        fireEvent.change(getByTestId("password"), {target: {value: "12345678"}});

        fireEvent.click(getByTestId("submit"));

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith({
                title: "example@gamil.com",
                description: "12345678",
            });
        });
    });
});