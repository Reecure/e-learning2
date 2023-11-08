export interface ModuleLesson {
    id: string;
    lesson_id: string;
    is_visible: boolean;
    title: string;
    lesson_type: string;
    order: number;
    author_id: string;
}
export type Module = {
    id: string
    course_id: string
    author_id: string
    lessons: ModuleLesson[]
    is_visible: boolean
    title: string
};