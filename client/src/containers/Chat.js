import { Avatar, Box, IconButton, TextField, Typography } from "@mui/material";
import { Send } from "@mui/icons-material";
import Message from "../components/Message";
import { fonts, getDateMonth } from "../common/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DateChip from "../components/DateChip";

const Chat = () => {
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const activeChatName = useSelector((state) => state.chats.activeChatName);

  const [message, setMessage] = useState("");

  const participantsList = () => {
    return selectedChat.type === "group"
      ? selectedChat.participants
          .filter((part) => part._id !== sessionStorage.getItem("chattyUserId"))
          .map((part) => part.name)
          .join(",")
      : "";
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      axios
        .post("https://chatapp-ochre-tau.vercel.app/api/v1/chat/ping", {
          chatroomId: selectedChat._id,
          author: sessionStorage.getItem("chattyUserId"),
          message,
        })
        .then((res) => {
          setMessage("");
        });
    }
  };

  const scrollToBottom = () => {
    let chatWindow = document.getElementById("chatWindow");
    chatWindow?.scroll({
      top: chatWindow.scrollHeight,
    });
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <Box
      style={{
        backgroundColor: "#3b3e46ff",
        height: "100%",
        padding: "1.5vw",
        boxSizing: "border-box",
      }}
    >
      {!selectedChat || Object.keys(selectedChat).length === 0 ? (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#23262fff",
            borderRadius: "0.5vw",
            padding: "1vw",
            boxSizing: "border-box",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="#fff" fontSize={fonts.font_26}>
            Select a chat
          </Typography>
        </Box>
      ) : (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: "#23262fff",
            borderRadius: "0.5vw",
            padding: "1vw",
            boxSizing: "border-box",
          }}
        >
          <Box style={{ display: "flex", alignItems: "center", height: "5%" }}>
            <Avatar
              sx={{
                width: "2vw",
                height: "2vw",
                marginRight: "1vw",
                fontSize: fonts.font_24,
                color: "#3b3e46ff",
              }}
            >
              {activeChatName.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Box
                style={{
                  color: "#fff",
                  fontSize: fonts.font_18,
                  padding: "0.2vw 0",
                }}
              >
                {activeChatName}
              </Box>
              <Box
                style={{
                  color: "#777889ff",
                  fontSize: fonts.font_18,
                  padding: "0.2vw 0",
                }}
              >
                {participantsList()}
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              backgroundColor: "#3b3e46ff",
              height: "94%",
              padding: "0.6vw",
              boxSizing: "border-box",
              marginTop: "1%",
              borderRadius: "0.4vw",
            }}
          >
            <Box
              style={{ height: "92%", overflowY: "scroll" }}
              sx={{
                "::-webkit-scrollbar": { display: "none" },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
              id="chatWindow"
            >
              {selectedChat.pings.map((ping, index) => (
                <>
                  {index === 0 && <DateChip date={ping.createdAt} />}
                  <Message
                    content={ping.message}
                    type={
                      ping.author === sessionStorage.getItem("chattyUserId")
                        ? "sender"
                        : "receiver"
                    }
                    timestamp={ping.createdAt}
                    authorName={ping.authorName}
                    chat={selectedChat.type}
                  />
                  {index !== selectedChat.pings.length - 1 &&
                    new Date(ping?.createdAt).getDate() !==
                      new Date(
                        selectedChat.pings[index + 1].createdAt
                      ).getDate() && (
                      <DateChip
                        date={selectedChat.pings[index + 1].createdAt}
                      />
                    )}
                </>
              ))}
            </Box>
            <Box
              style={{
                height: "8%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant="standard"
                placeholder="Message"
                fullWidth
                size="small"
                InputProps={{ disableUnderline: true }}
                inputProps={{
                  style: {
                    fontSize: fonts.font_18,
                    color: "#fff",
                    backgroundColor: "#23262fff",
                    borderRadius: "0.4vw",
                    padding: "0.4vw 0 0.4vw 1vw",
                    marginRight: "0.7vw",
                  },
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <IconButton
                sx={{
                  backgroundColor: "#2f80edff",
                  borderRadius: "0.4vw",
                  height: "2vw",
                  width: "3vw",
                  ":hover": {
                    bgcolor: "#2f80edff",
                  },
                }}
                onClick={handleSendMessage}
              >
                <Send
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
        </Box>
      )}
    </Box>
  );
};

export default Chat;
