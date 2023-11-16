import {ComponentRender} from "@/shared/config/test/test-utils";
import DeleteModal from "./DeleteModal";
import {fireEvent} from "@testing-library/react";

const mockProps = {
    itemName: "Item",
    deleteIsOpen: true,
    deleteOpenHandler: jest.fn(),
    deleteFunc: jest.fn(),
    setNotificationOpen: jest.fn(),
};

describe("DeleteModal", () => {
    test("renders DeleteModal with correct content", () => {
        const {getByTestId} = ComponentRender(<DeleteModal {...mockProps} />);

        expect(getByTestId("delete-modal"));
    });

    test("input change updates deleteValue state", () => {
        const {getByTestId} = ComponentRender(<DeleteModal {...mockProps} />);

        const input = getByTestId("delete-input");
        fireEvent.change(input, {target: {value: "delete"}});

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        expect(input.value).toBe("delete");
    });

    test("submit form calls deleteFunc and setNotificationOpen", () => {
        const {getByTestId, getByRole} = ComponentRender(<DeleteModal {...mockProps} />);

        const input = getByTestId("delete-input");
        const deleteButton = getByRole("button", {name: "DELETE"});


        fireEvent.change(input, {target: {value: "delete"}});
        fireEvent.click(deleteButton);

        expect(mockProps.deleteFunc).toHaveBeenCalled();
        expect(mockProps.setNotificationOpen).toHaveBeenCalled();
    });
});