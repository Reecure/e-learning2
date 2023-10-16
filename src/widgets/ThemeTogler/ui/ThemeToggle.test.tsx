import React from "react";
import {Themes, ThemeToggle} from "@/widgets/ThemeTogler";
import {fireEvent, screen} from "@testing-library/react";
import {ComponentRender} from "../../../shared/config/test/test-utils";


describe("ThemeToggle", () => {
	test("renders ThemeToggle component with the correct theme", () => {
		const toggleThemeMock = jest.fn();
		ComponentRender(<ThemeToggle theme={Themes.LIGHT} toggleTheme={toggleThemeMock}/>);

		const ThemeToggleComponent = screen.getByTestId("ThemeToggle");

		expect(ThemeToggleComponent).toBeInTheDocument();
	});
	test("ThemeToggle switch theme", () => {
		const toggleThemeMock = jest.fn();
		ComponentRender(<ThemeToggle theme={Themes.LIGHT} toggleTheme={toggleThemeMock}/>);

		const ThemeToggleComponent = screen.getByTestId("ThemeToggle");

		fireEvent.click(ThemeToggleComponent);

		expect(toggleThemeMock).toBeCalledTimes(1);
	});
});