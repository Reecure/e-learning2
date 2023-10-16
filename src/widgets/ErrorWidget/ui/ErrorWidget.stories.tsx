import {Meta, StoryObj} from "@storybook/react";
import ErrorWidget from "./ErrorWidget";

const meta = {
	title: "ErrorWidget",
	component: ErrorWidget,
	parameters: {
		layout: "center",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ErrorWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorWidgetStory: Story = {
	args: {},
	name: "ErrorWidget"
};
