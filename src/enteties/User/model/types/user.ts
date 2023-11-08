import {LessonType} from "@/enteties/Lesson";

export enum UserRoles {
    ADMIN = "admin",
    USER = "user",
    TEACHER = "teacher",
}


export type CourseProgress = {
    course_id: string
    is_completed: boolean
    course_name: string
    start_course?: string
    complete_percentage?: number
};

export type ModuleProgress = {
    real_module_id?: string
    module_name: string
    is_completed: boolean
    module_id: string
    course_id: string
};

export type LessonProgress = {
    lesson_name: string
    complete_date: Date
    read_later?: boolean
    is_completed: boolean
    lessonType: LessonType
    module_id: string
    lesson_id: string
    quizScore: number
};

export type User = {
    id: string
    avatar: string
    courses: string[]
    courses_progress: CourseProgress[]
    email: string
    firstname: string
    is_new_user: boolean
    lastname: string
    favorite_course: string
    last_course: string
    lessons_progress: LessonProgress[]
    modules_progress: ModuleProgress[]
    password: string
    registration_date: Date
    role: UserRoles

};
