import type {Meta, StoryObj} from "@storybook/react";
import {Sidebar} from "@/widgets/Sidebar";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Sidebar",
    component: Sidebar,
    parameters: {
        layout: "left",
        nextAuthMock: {
            session: "unknown"
        }
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SidebarStory: Story = {
    args: {},
    name: "Sidebar"
};
