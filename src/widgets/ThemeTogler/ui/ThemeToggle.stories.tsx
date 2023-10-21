import type {Meta, StoryObj} from "@storybook/react";
import {Themes, ThemeToggle} from "@/widgets/ThemeTogler";


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "ThemeToggler",
    component: ThemeToggle,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeTogglerOnDark: Story = {
    args: {
        theme: Themes.DARK
    },
    name: "ThemeTogglerOnDark"
};

export const ThemeTogglerOnLight: Story = {
    args: {
        theme: Themes.LIGHT
    },
    name: "ThemeTogglerOnLight"
};