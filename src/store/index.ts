import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "./slice/Counter.Slice.tsx";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
