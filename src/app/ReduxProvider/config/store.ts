import {configureStore} from "@reduxjs/toolkit";

import {CurrentLessonReducer} from "@/shared/ui/course/model";

export const store = configureStore({
	reducer: {
		CurrentLessonReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
