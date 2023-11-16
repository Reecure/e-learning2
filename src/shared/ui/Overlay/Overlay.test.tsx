import {ComponentRender} from "@/shared/config/test/test-utils";
import {Overlay} from "@/shared/ui";
import {fireEvent} from "@testing-library/react";


describe("Overlay", () => {

    test("renders with default styles", () => {
        const {getByTestId} = ComponentRender(<Overlay/>);

        const overlayElement = getByTestId("overlay");

        expect(overlayElement).toHaveClass("flex items-center");
    });

    test("renders with additional className", () => {
        const className = "custom-class";
        const {getByTestId} = ComponentRender(<Overlay className={className}/>);

        const overlayElement = getByTestId("overlay");

        expect(overlayElement).toHaveClass(className);
    });

    test("calls onClick when clicked", () => {
        const onClickMock = jest.fn();
        const {getByTestId} = ComponentRender(<Overlay onClick={onClickMock}/>);

        const overlayElement = getByTestId("overlay");

        fireEvent.click(overlayElement);

        expect(onClickMock).toHaveBeenCalled();
    });
});
