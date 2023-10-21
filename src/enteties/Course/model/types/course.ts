export enum DifficultLevels {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}
export interface CourseModules {
    id: string
    module_id: string
    is_visible: boolean
    title: string
    order: number;
    author_id: string;
}


export type Course = {
    id: string;
    author_id: string;
    category_id: string;
    modules: CourseModules[]
    title: string;
    description: string;
    cover_description: string;
    cover_image: string;
    creation_date: Date;
    duration: string;
    is_visible: boolean;
    difficulty_level: string;
    rating: number;
};

