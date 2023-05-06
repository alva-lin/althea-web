import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { DeleteChat, GetChatMessages, GetChats, RenameChat } from "../../services/chat/api.ts";
import { ChatId, ChatInfo, MessageInfo } from "../../services/chat/models.ts";
import { RenameChatReqDto } from "../../services/chat/requestModels.ts";
import { RootState } from "../index.ts";

const chatsAdapter = createEntityAdapter<ChatInfo>();
const messagesAdapter = createEntityAdapter<MessageInfo>();

type ChatState = {
  chats: ReturnType<typeof chatsAdapter.getInitialState>;
  messages: ReturnType<typeof messagesAdapter.getInitialState>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ChatState = {
  chats: chatsAdapter.getInitialState(),
  messages: messagesAdapter.getInitialState(),
  status: "idle",
  error: null,
};


export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  const response = await GetChats();
  return response.data;
});

export const updateChatName = createAsyncThunk("chat/updateChatName", async (data: RenameChatReqDto) => {
  await RenameChat(data);
  return data;
});

export const removeChat = createAsyncThunk("chat/removeChat", async (data: { id: ChatId }) => {
  await DeleteChat(data);
  return data.id;
});

export const fetchChatMessages = createAsyncThunk("chat/fetchChatMessages", async (data: { id: ChatId }) => {
  const response = await GetChatMessages(data);
  return { chatId: data.id, messages: response.data };
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = "succeeded";
        chatsAdapter.setAll(state.chats, action.payload as ChatInfo[]);
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch chats";
      })
      .addCase(updateChatName.fulfilled, (state, action) => {
        chatsAdapter.updateOne(state.chats, {
          id: action.payload.id,
          changes: { name: action.payload.title }
        });
      })
      .addCase(removeChat.fulfilled, (state, action) => {
        chatsAdapter.removeOne(state.chats, action.payload);
      })
      .addCase(fetchChatMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatMessages
        .fulfilled, (state, action) => {
        state.status = "succeeded";
        messagesAdapter.setAll(state.messages, action.payload.messages as MessageInfo[]);
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch chat messages";
      });
  },
});

export default chatSlice.reducer;

export const {
  selectAll: selectAllChats,
  selectById: selectChatById,
  selectIds: selectChatIds,
  selectEntities: selectChatEntities,
  selectTotal: selectTotalChats,
} = chatsAdapter.getSelectors((state: RootState) => state.chat.chats);

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessageIds,
  selectEntities: selectMessageEntities,
  selectTotal: selectTotalMessages,
} = messagesAdapter.getSelectors((state: RootState) => state.chat.messages);
