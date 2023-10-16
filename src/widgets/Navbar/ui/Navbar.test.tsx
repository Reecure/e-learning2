import {ComponentRender} from "@/shared/config/test/test-utils";
import {screen} from "@testing-library/react";
import {Navbar} from "@/widgets/Navbar";
import {Themes} from "@/widgets/ThemeTogler";

describe("Navbar", () => {
	test("Navbar rendered", () => {
		const mockToggle = jest.fn();
		ComponentRender(<Navbar theme={Themes.DARK} toggleTheme={mockToggle}/>);
		const navbarEl = screen.getByTestId("sidebar");

		expect(navbarEl).toBeInTheDocument();
	});
});