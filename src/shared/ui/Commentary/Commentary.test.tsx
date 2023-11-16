import {ComponentRender} from "@/shared/config/test/test-utils";
import Commentary from "@/shared/ui/Commentary/Commentary";
import {Review} from "@/enteties/Review";

const mock: Review = {
    id: "1",
    text: "Text",
    creation_date: new Date(),
    user_id: "12",
    course_id: "123"

};
describe("Commentary", () => {
    test("", () => {
        const {getByTestId} = ComponentRender(<Commentary info={mock}/>);

        const item = getByTestId("commentary");

        expect(item).toBeInTheDocument();
        expect(item).toHaveTextContent(mock.text);

    });
});