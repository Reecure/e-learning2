import {ComponentRender} from "@/shared/config/test/test-utils";
import QuizShowScore from "@/shared/ui/Quiz/QuizShowScore/QuizShowScore";

const props = {
    totalQuestions: 10,
    score: 8,
    setScore: jest.fn(),
    setShowScore: jest.fn(),
    setCurrentQuestion: jest.fn(),
};
describe("QuizShowScore", () => {
    test("renders quiz score correctly", () => {
        const {getByText} = ComponentRender(
            <QuizShowScore {...props} />
        );

        const score = getByText("8");
        const incorrect = getByText("Incorrect");
        const correct = getByText("Correct");
        const totalQuestions = getByText("Accuracy");

        expect(score).toBeInTheDocument();
        expect(incorrect).toBeInTheDocument();
        expect(correct).toBeInTheDocument();
        expect(totalQuestions).toBeInTheDocument();
    });
});

