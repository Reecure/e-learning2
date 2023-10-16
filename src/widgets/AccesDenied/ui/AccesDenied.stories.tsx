import {Meta, StoryObj} from "@storybook/react";
import AccesDenied from "@/widgets/AccesDenied/ui/AccesDenied";


const meta = {
	title: "AccesDenied",
	component: AccesDenied,
	parameters: {
		layout: "center",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof AccesDenied>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccesDeniedStory: Story = {
	args: {},
	name: "AccesDenied"
};