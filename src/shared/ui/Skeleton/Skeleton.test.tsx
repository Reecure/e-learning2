import {ComponentRender} from "@/shared/config/test/test-utils";
import Skeleton from "@/shared/ui/Skeleton/Skeleton";


describe("Skeleton Component", () => {
    test("renders with default values", () => {
        const {container} = ComponentRender(<Skeleton/>);
        const skeletonElement = container.firstChild;

        expect(skeletonElement).toHaveStyle({
            width: "100%",
            height: "100%",
        });

        expect(skeletonElement).toHaveClass("bg-neutral-200 dark:bg-neutral-600 animate-pulse rounded-md");

    });
    test("renders with custom width and height", () => {
        const {container} = ComponentRender(<Skeleton width={200} height={300}/>);
        const skeletonElement = container.firstChild;

        expect(skeletonElement).toHaveStyle({
            width: "200px",
            height: "300px",
        });
    });
});
