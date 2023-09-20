import { Avatar, Box, IconButton } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import { fonts, getTimestamp, readChat } from "../common/utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import SearchSection from "./SearchSection";

const ChatList = ({ selectChat }) => {
  const chats = useSelector((state) => state.chats.chats);
  const selectedChat = useSelector((state) => state.chats.selectedChat);

  const [showSearch, setShowSearch] = useState(false);
  const [tab, setTab] = useState(0);

  const resetSearch = () => {
    setShowSearch(false);
  };

  const getNewCount = () => {
    return chats.filter((chat) => chat.unreadCount > 0).length;
  };

  return (
    <Box
      style={{
        backgroundColor: "#3b3e46ff",
        height: "100%",
        padding: "1.5vw",
        boxSizing: "border-box",
      }}
    >
      {showSearch ? (
        <SearchSection resetSearch={resetSearch} />
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.7vw",
            height: "100%",
            backgroundColor: "#23262fff",
            borderRadius: "0.5vw",
            padding: "1vw",
            boxSizing: "border-box",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                display: "flex",
                gap: "0.8vw",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ color: "#fff", fontSize: fonts.font_20 }}>
                Inbox
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-around",
              backgroundColor: "#282b34ff",
              padding: "0.35vw 0.45vw",
              boxSizing: "border-box",
              borderRadius: "0.4vw",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: tab === 0 && "#3b3e46ff",
                color: "#2f80edff",
                padding: "0.2vw 0.7vw",
                borderRadius: "0.4vw",
                fontSize: fonts.font_16,
                width: "35%",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => setTab(0)}
            >
              Primary
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: tab === 1 && "#3b3e46ff",
                color: "#2f80edff",
                padding: "0.2vw 0.7vw",
                borderRadius: "0.4vw",
                fontSize: fonts.font_16,
                width: "35%",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => setTab(1)}
            >
              Groups
            </Box>
          </Box>
          <Box
            style={{ overflowX: "hidden", overflowY: "scroll", height: "100%" }}
            sx={{
              "::-webkit-scrollbar": { display: "none" },
              "-ms-overflow-style": "none",
              "scrollbar-width": "none",
            }}
          >
            {chats
              .filter((chat) =>
                tab === 0 ? chat.type === "dm" : chat.type === "group"
              )
              .map((chat) => (
                <Box
                  style={{
                    display: "flex",
                    justifyContent: chat.type === "dm" && "space-between",
                    padding: "0.7vw",
                    backgroundColor:
                      chat?._id === selectedChat?._id
                        ? "#3b3e46ff"
                        : "#23262fff",
                    borderRadius: "0.4vw",
                    cursor: "pointer",
                  }}
                  onClick={() => selectChat(chat)}
                >
                  <Box style={{ alignSelf: "center" }}>
                    <Avatar
                      sx={{
                        width: "2vw",
                        height: "2vw",
                        fontSize: fonts.font_24,
                        color: "#3b3e46ff",
                      }}
                    >
                      {chat.name === ""
                        ? chat.participants
                            .filter(
                              (part) =>
                                part._id !==
                                sessionStorage.getItem("chattyUserId")
                            )[0]
                            .name.charAt(0)
                            .toUpperCase()
                        : chat.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      width: "55%",
                      flexDirection: "column",
                      marginLeft: "1vw",
                    }}
                  >
                    <Box
                      style={{
                        color: "#fff",
                        fontSize: fonts.font_18,
                        padding: "0.2vw 0",
                      }}
                    >
                      {chat.name === ""
                        ? chat.participants.filter(
                            (part) =>
                              part._id !==
                              sessionStorage.getItem("chattyUserId")
                          )[0].name
                        : chat.name}
                    </Box>
                    <Box
                      style={{
                        color: "#777889ff",
                        fontSize: fonts.font_18,
                        padding: "0.2vw 0 0vw",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {chat.pings.length > 0
                        ? chat.type === "group" &&
                          chat.latestPing.author !==
                            sessionStorage.getItem("chattyUserId")
                          ? `${chat.latestPing.authorName}: ${chat.latestPing.message}`
                          : chat.latestPing.message
                        : ""}
                    </Box>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box style={{ color: "#fff", fontSize: fonts.font_14 }}>
                      {chat.pings.length > 0 &&
                        getTimestamp(
                          chat.pings[chat.pings.length - 1].createdAt
                        )}
                    </Box>
                  </Box>
                </Box>
              ))}
            <IconButton
              sx={{
                backgroundColor: "#2f80edff",
                borderRadius: "0.4vw",
                height: "2.5vw",
                width: "3vw",
                ":hover": {
                  bgcolor: "#2f80edff",
                },
                position: "fixed",
                bottom: "2.5vw",
                left: "14.5vw",
                zIndex: 1001,
              }}
              onClick={() => setShowSearch(true)}
            >
              <Add
                sx={{
                  width: "1.6vw",
                  height: "1.6vw",
                  color: "#fff",
                  alignSelf: "center",
                  padding: "0.2vw",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatList;
