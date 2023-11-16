import {ComponentRender} from "@/shared/config/test/test-utils";
import QuizPreviousResult from "@/shared/ui/Quiz/QuizPreviousResult/QuizPreviousResult";


describe("Skeleton Component", () => {
    test("renders with the provided result", () => {
        const result = 80;
        const {getByTestId, getByText} = ComponentRender(<QuizPreviousResult res={result}/>);

        // Check if the component renders with the correct result
        const resultElement = getByTestId("quiz-previous-result");
        expect(resultElement).toBeInTheDocument();

        // Check if the result is styled with the correct class
        const resultValueElement = getByText(result.toString());
        expect(resultValueElement).toHaveClass("text-blue-400 dark:text-blue-700 text-xl");
    });
});
