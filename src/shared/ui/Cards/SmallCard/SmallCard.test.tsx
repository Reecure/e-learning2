import {fireEvent, screen} from "@testing-library/react";
import {ComponentRender} from "@/shared/config/test/test-utils";
import {Routes} from "@/shared/config/routes";
import {SmallCard} from "@/shared/ui";
import {Course} from "@/enteties/Course";
import {DifficultLevels} from "@/enteties/Course/model/types/course";


const mockCourse: Course = {
    id: "123abc",
    author_id: "456def",
    category_id: "789ghi",
    modules: [],
    title: "Mocking 101",
    description: "Learn the art of mock-fu and never cry over undefined again.",
    cover_description: "A cover that'll make you weep tears of joy.",
    cover_image: "mock_image.jpg",
    creation_date: new Date("2023-01-01"),
    update_date: new Date("2023-11-15"),
    duration: "4 weeks",
    is_visible: true,
    difficulty_level: DifficultLevels.EASY,
    rating: 4.5,
};
describe("SmallCard", () => {
    test("renders course information", () => {
        ComponentRender(<SmallCard course={mockCourse}/>);

        const courseTitle = screen.getByText("Test Course");
        const courseDescription = screen.getByText("This is a test course description.");

        expect(courseTitle).toBeInTheDocument();
        expect(courseDescription).toBeInTheDocument();
    });

    test("clicking on the card navigates to the correct URL", () => {
        ComponentRender(<SmallCard course={mockCourse}/>);

        const cardLink = screen.getByText("Test Course");

        fireEvent.click(cardLink);

        expect(window.location.pathname).toBe(`${Routes.USER_COURSE_PAGE_LESSONS}/${mockCourse.id}`);
    });
});
