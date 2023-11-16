import {ComponentRender} from "@/shared/config/test/test-utils";
import {Notification} from "@/shared/ui";
import {waitFor} from "@testing-library/react";

const mockFunc = jest.fn();

describe("Notification", () => {
    test("render Notification when open is true", async () => {
        const {queryByText} = ComponentRender(<Notification
            open={true}
            onClose={mockFunc}
            timeoutDelay={3000}
        >Children</Notification>
        );

        const item = queryByText("Children");

        await waitFor(() => {
            expect(item).toBeInTheDocument();
        });
    });
    test("ender Notification when open is false", async () => {
        const {queryByText} = ComponentRender(<Notification
            open={false}
            onClose={mockFunc}
            timeoutDelay={3000}
        >Children</Notification>
        );

        const item = queryByText("Children");

        await waitFor(() => {
            expect(item).not.toBeInTheDocument();
        });
    });
});