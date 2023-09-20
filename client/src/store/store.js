import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat";

const store = configureStore({ reducer: { chats: chatReducer } });

export default store;
