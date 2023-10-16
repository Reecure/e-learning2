export interface ModuleLesson {
    id: string
    lesson_id: string
    is_visible: boolean
    title: string
    lesson_type: string
    order: number;
    author_id: string;
}

export type Module = {
    id: string;
    title: string;
    author_id: string;
    is_visible: boolean
    lessons: ModuleLesson[]
    order: number;
    course_id: string;
};
