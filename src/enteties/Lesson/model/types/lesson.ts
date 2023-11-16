export enum LessonType {
    TEXT = "TEXT",
    QUIZ = "QUIZ",
}

export enum LessonContentType {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    CODE = "CODE",
    VIDEO = "VIDEO",
}

export enum QuizContentType {
    QUESTION_ANSWER = "QUESTION_ANSWER",
    ANSWER_WITH_FIXED_LETTERS = "ANSWER_WITH_FIXED_LETTERS",
    ALPHABET_SOUP_QUIZ = "ALPHABET_SOUP_QUIZ",
    TRUE_FALSE = "TRUE_FALSE"
}

export interface ITextBlock {
    id: string;
    title: string;
    paragraphs: Array<{
        id: string;
        text: string;
    }>;
    type: LessonContentType.TEXT;
}

export interface ICodeBlock {
    id: string;
    type: LessonContentType.CODE;
    code: string;
}

export interface IImageBlock {
    id: string;
    type: LessonContentType.IMAGE;
    src: string;
    title: string;
}

export interface IVideoBlock {
    id: string;
    url: string;
    type: LessonContentType.VIDEO;
}


export type LessonBlocks = ITextBlock | ICodeBlock | IImageBlock | IVideoBlock;

export type QuestionAnswerBlock = {
    id: string;
    type: QuizContentType.QUESTION_ANSWER;
    question: string;
    correctAnswer: string;
    answer: Array<{
        otherAnswer: string;
    }>;
};

export type AnswerWithFixedLetters = {
    id: string;
    type: QuizContentType.ANSWER_WITH_FIXED_LETTERS;
    question: string;
    answer: string;
};

export type AlphabetSoupQuiz = {
    id: string;
    type: QuizContentType.ALPHABET_SOUP_QUIZ;
    question: string;
    answer: string;
};

export type TrueFalseQuiz = {
    id: string;
    type: QuizContentType.TRUE_FALSE;
    question: string;
    answer: string;
};


export type QuizBlocks = QuestionAnswerBlock | AnswerWithFixedLetters | AlphabetSoupQuiz | TrueFalseQuiz

export interface LessonsContent {
    blocks: LessonBlocks[] | QuizBlocks[];
}


export interface Lesson {
    id: string;
    title: string;
    order: number;
    author_id: string;
    module_id: string;
    lesson_type: LessonType;
    lesson_content: LessonsContent;
}
