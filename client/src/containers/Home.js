import { Box } from "@mui/material";
import ChatList from "./ChatList";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChatName, setChats, setSelectedChat } from "../store/chat";
import { io } from "socket.io-client";
import { getActiveChatName, readChat } from "../common/utils";

const Home = () => {
  const chats = useSelector((state) => state.chats.chats);
  const selectedChat = useSelector((state) => state.chats.selectedChat);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const socket = useRef();

  useEffect(() => {
    if (!sessionStorage.getItem("chattyUserId")) {
      navigate("/login");
    } else {
      getChatList();
    }
    socket.current = io("https://chatapp-ochre-tau.vercel.app/api/v1");
  }, []);

  const getUnreadCount = (chat) => {
    let totalCount = chat.pings.length;
    let userReadCount = chat.read.find(
      (user) => user.participantId === sessionStorage.getItem("chattyUserId")
    )?.readNotificationCount;
    if (chat._id === selectedChat._id) {
      return 0;
    }
    if (!userReadCount) {
      return totalCount;
    }
    return totalCount - userReadCount;
  };

  const findAuthorName = (participantsList, authorId) => {
    return participantsList.filter(
      (participant) => participant._id === authorId
    )[0].name;
  };

  const sortChats = (chats) => {
    let sortedChats = chats.sort(function (a, b) {
      if (a.latestPing) {
        if (b.latestPing) {
          return (
            new Date(b.latestPing.createdAt) - new Date(a.latestPing.createdAt)
          );
        } else {
          return new Date(b.createdAt) - new Date(a.latestPing.createdAt);
        }
      }
    });

    let finalChats = sortedChats.map((chat) => {
      return { ...chat, unreadCount: getUnreadCount(chat) };
    });

    finalChats = finalChats.map((chat) => {
      if (chat.type === "group") {
        chat.pings.forEach((ping) => {
          !ping.authorName &&
            (ping.authorName = findAuthorName(chat.participants, ping.author));
          chat.latestPing.authorName = findAuthorName(
            chat.participants,
            chat.latestPing.author
          );
        });
      }
      return chat;
    });

    dispatch(setChats({ chats: finalChats }));
  };

  const getChatList = () => {
    axios
      .get(
        `https://chatapp-ochre-tau.vercel.app/api/v1/find/mychats?userId=${sessionStorage.getItem(
          "chattyUserId"
        )}`
      )
      .then((res) => {
        sortChats(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    socket.current.on("ping", (chat) => {
      if (selectedChat._id) {
        if (chat.chatId === selectedChat._id) {
          dispatch(
            setSelectedChat({
              selectedChat: {
                ...selectedChat,
                pings: [...selectedChat.pings, chat.ping],
                latestPing: chat.ping,
              },
            })
          );
        }
      } else {
        getChatList();
      }
    });
  });

  const selectChat = (chat) => {
    dispatch(setActiveChatName({ name: getActiveChatName(chat) }));

    let chatList = chats;
    let final = chatList.map((item) => {
      if (chat._id === item._id) {
        return { ...item, unreadCount: 0 };
      } else {
        return item;
      }
    });
    dispatch(setChats({ chats: final }));
    dispatch(setSelectedChat({ selectedChat: chat }));
  };

  return (
    <Box style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Box style={{ width: "20%" }}>
        <ChatList selectChat={selectChat} />
      </Box>
      <Box style={{ width: "80%" }}>
        <Chat />
      </Box>
    </Box>
  );
};

export default Home;
