import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: { chats: [], selectedChat: [], activeChatName: "" },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload.chats;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload.selectedChat;
    },
    setActiveChatName: (state, action) => {
      state.activeChatName = action.payload.name;
    },
  },
});

export default chatSlice.reducer;
export const setChats = chatSlice.actions.setChats;
export const setSelectedChat = chatSlice.actions.setSelectedChat;
export const setActiveChatName = chatSlice.actions.setActiveChatName;
