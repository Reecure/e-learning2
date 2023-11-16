import {ComponentRender} from "@/shared/config/test/test-utils";
import {Text} from "@/shared/ui";
import {screen} from "@testing-library/react";

describe("Text", () => {
    test("Text rendered", () => {
        ComponentRender(<Text text={"Hello"}/>);

        const textEl = screen.getByText("Hello");

        expect(textEl).toBeInTheDocument();
    });
    test("Text without error rendered", () => {
        ComponentRender(<Text text={"Hello"}/>);

        const textEl = screen.getByText("Hello");

        expect(textEl).not.toHaveClass("text-light-error-main");
    });
    test("Text for error rendered", () => {
        ComponentRender(<Text text={"Hello"} error/>);

        const textEl = screen.getByText("Hello");

        expect(textEl).toHaveClass("text-light-error-main");
    });
});