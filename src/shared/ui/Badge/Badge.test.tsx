import {ComponentRender} from "@/shared/config/test/test-utils";
import Badge, {BadgeColors} from "./Badge";

describe("Badge", () => {
    test("renders Badge", () => {
        const text = "Text";
        const {getByText} = ComponentRender(<Badge text={text} color={BadgeColors.RED}/>);

        const item = getByText(`${text}`);

        expect(item).toBeInTheDocument();
    });
    test("renders GREEN Badge", () => {
        const text = "Text";
        const {getByTestId} = ComponentRender(<Badge text={text} color={BadgeColors.GREEN}/>);

        const item = getByTestId("badge");

        expect(item).toBeInTheDocument();
        expect(item).toHaveClass(BadgeColors.GREEN);
    });
    test("renders YELLOW Badge", () => {
        const text = "Text";
        const {getByTestId} = ComponentRender(<Badge text={text} color={BadgeColors.YELLOW}/>);

        const item = getByTestId("badge");

        expect(item).toBeInTheDocument();
        expect(item).toHaveClass(BadgeColors.YELLOW);
    });
    test("renders RED Badge", () => {
        const text = "Text";
        const {getByTestId} = ComponentRender(<Badge text={text} color={BadgeColors.RED}/>);

        const item = getByTestId("badge");

        expect(item).toBeInTheDocument();
        expect(item).toHaveClass(BadgeColors.RED);
    });
});