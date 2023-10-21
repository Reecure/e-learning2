import {Meta, StoryObj} from "@storybook/react";
import {Text} from "@/shared/ui";


const meta = {
    title: "Text",
    component: Text,
    parameters: {
        layout: "center",
        nextAuthMock: {
            session: "unknown"
        }
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextStory: Story = {
    args: {
        error: false,
        text: "Text"
    },
    name: "Text"
};
export const TextErrorStory: Story = {
    args: {
        error: true,
        text: "Error"
    },
    name: "TextError"
};

