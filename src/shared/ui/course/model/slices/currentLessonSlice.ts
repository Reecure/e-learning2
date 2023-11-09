import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface StateProps {
    previewVisible: boolean,
    currentLessonId: {
        lesson_id: string,
        progress_lesson_id: string
    },
}

const initialState: StateProps = {
    previewVisible: true,
    currentLessonId: {
        lesson_id: "",
        progress_lesson_id: ""
    },
};

const currentLessonSlice = createSlice({
    name: "currentLesson",
    initialState,
    reducers: {
        setCurrentLessonId(state, action: PayloadAction<Pick<StateProps, "currentLessonId">>) {
            const {currentLessonId} = action.payload;
            state.currentLessonId = {
                lesson_id: currentLessonId.lesson_id,
                progress_lesson_id: currentLessonId.progress_lesson_id,
            };
        },
        setPreviewVisible(state, action) {
            state.previewVisible = action.payload;
        },
    },
});

export default currentLessonSlice.reducer;

export const {setCurrentLessonId, setPreviewVisible} = currentLessonSlice.actions;
