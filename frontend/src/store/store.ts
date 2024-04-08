import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cvSlice } from "./cv/cvSlice";
import cvTemplateSlice from "./cvTemplate/cvTemplateSlice";

const rootReducer = combineReducers({
    cv: cvSlice.reducer,
    cvTemplate: cvTemplateSlice.reducer,
  });

export type RootState = ReturnType<typeof rootReducer>;


export const store = configureStore({
  reducer: rootReducer,
});
