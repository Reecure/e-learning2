import {ComponentRender} from "@/shared/config/test/test-utils";
import StubText from "@/shared/ui/StubText/StubText";
import {Routes} from "@/shared/config/routes";


describe("StubText Component", () => {
    test("renders StubText component with title", () => {
        const title = "Test Title";
        const {getByText} = ComponentRender(<StubText title={title}/>);

        expect(getByText(title)).toBeInTheDocument();
    });

    test("renders StubText component with link", () => {
        const title = "Test Title";
        const linkText = "Test Link";
        const {getByText} = ComponentRender(<StubText title={title} linkText={linkText}/>);

        expect(getByText(linkText)).toBeInTheDocument();
    });

    test("navigates to correct route when link is clicked", () => {
        const title = "Test Title";
        const linkText = "Test Link";
        const {getByText} = ComponentRender(<StubText title={title} linkText={linkText}/>);

        getByText(linkText).click();

        expect(document.querySelector("a")).toHaveAttribute("href", Routes.COURSES);
    });
});
