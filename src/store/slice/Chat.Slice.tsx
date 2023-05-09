import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatId } from "../../services/chat/models.ts";


type ChatState = {
  activeChatId?: ChatId;
};

const initialState: ChatState = {
  activeChatId: undefined,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<{id?: ChatId}>) => {
      state.activeChatId = action.payload.id;
    },
  },
});

export const { setActiveChat } = chatSlice.actions;

export const selectChatInfo = (state: { chat: ChatState }) => state.chat;

export default chatSlice.reducer;
