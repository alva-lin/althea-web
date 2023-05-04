import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import chatReducer from "./slice/Chat.Slice.tsx";
import counterReducer from "./slice/Counter.Slice.tsx";


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    chat: chatReducer,
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
