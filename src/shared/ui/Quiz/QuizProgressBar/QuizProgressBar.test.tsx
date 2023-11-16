import {ComponentRender} from "@/shared/config/test/test-utils";
import QuizProgressBar from "@/shared/ui/Quiz/QuizProgressBar/QuizProgressBar";


describe("Skeleton Component", () => {
    test("renders progress bar with correct width", () => {
        const totalQuestion = 10;
        const currentQuestion = 5;

        const {getByTestId} = ComponentRender(
            <QuizProgressBar totalQuestion={totalQuestion} currentQuestion={currentQuestion}/>
        );

        const progressBar = getByTestId("progress-bar");
        const progressFill = getByTestId("progress-fill");

        const expectedWidth = `${(currentQuestion / totalQuestion) * 100}%`;

        expect(progressBar).toBeInTheDocument();
        expect(progressFill).toHaveStyle(`width: ${expectedWidth}`);
    });

    test("renders correct question numbers", () => {
        const totalQuestion = 10;
        const currentQuestion = 5;

        const {getByText} = ComponentRender(
            <QuizProgressBar totalQuestion={totalQuestion} currentQuestion={currentQuestion}/>
        );

        const questionNumbers = getByText(`${currentQuestion} / ${totalQuestion}`);

        expect(questionNumbers).toBeInTheDocument();
    });
});
