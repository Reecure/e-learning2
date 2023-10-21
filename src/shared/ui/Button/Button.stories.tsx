import type {Meta, StoryObj} from "@storybook/react";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Button",
    component: Button,
    parameters: {
        layout: "centered",

    },
    tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FILLED: Story = {
    args: {
        theme: ButtonThemes.FILLED,
        children: <>Button</>
    },
    name: "FILLED"
};
export const ELEVATED: Story = {
    args: {
        theme: ButtonThemes.ELEVATED,
        children: <>Button</>
    },
    name: "ELEVATED"
};
export const OUTLINED: Story = {
    args: {
        theme: ButtonThemes.OUTLINED,
        children: <>Button</>
    },
    name: "OUTLINED"
};

export const FILLED_TONAL: Story = {
    args: {
        theme: ButtonThemes.FILLED_TONAL,
        children: <>Button</>
    },
    name: "FILLED_TONAL"
};

export const TEXT: Story = {
    args: {
        theme: ButtonThemes.TEXT,
        children: <>Button</>
    },
    name: "TEXT"
};

export const CLEAR: Story = {
    args: {
        theme: ButtonThemes.CLEAR,
        children: <>Button</>
    },
    name: "CLEAR",
    storyName: "CLEAR"
};

