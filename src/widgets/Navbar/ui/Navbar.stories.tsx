import type {Meta, StoryObj} from "@storybook/react";
import {Navbar} from "@/widgets/Navbar";
import {Themes} from "@/widgets/ThemeTogler";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
	title: "Navbar",
	component: Navbar,
	parameters: {
		layout: "top",
		nextAuthMock: {
			session: "unknown"
		}
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavbarStory: Story = {
	args: {
		theme: Themes.LIGHT
	},
	name: "Navbar"
};
