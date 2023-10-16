import {fireEvent, screen} from "@testing-library/react";
import {Button} from "../index";
import {ButtonThemes} from "./Button";
import {ComponentRender} from "../../config/test/test-utils";

describe("Button", () => {
	test("Button render in document", () => {
		ComponentRender(<Button theme={ButtonThemes.FILLED}>test</Button>);

		const buttonEl = screen.getByTestId("button");

		expect(buttonEl).toBeInTheDocument();
	});
	test("Button click event", () => {
		const mockClickHandler = jest.fn();
		ComponentRender(<Button theme={ButtonThemes.FILLED} onClick={mockClickHandler}>test</Button>);

		const buttonEl = screen.getByTestId("button");

		fireEvent.click(buttonEl);

		expect(mockClickHandler).toHaveBeenCalledTimes(1);
	});
});