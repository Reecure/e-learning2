import type {StorybookConfig} from "@storybook/nextjs";
// @ts-ignore
import path from "path";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "storybook-tailwind-dark-mode",
        "@tomfreudenberg/next-auth-mock/storybook"
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    webpackFinal: async (config) => {
        config.resolve.alias = {
            '@': path.resolve(__dirname, '..', 'src'),
        };

        return config;
    },
};
export default config;
