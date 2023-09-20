import { Box, Typography } from "@mui/material";
import { fonts, getTimestamp } from "../common/utils";

const Message = ({ content, type, timestamp, authorName, chat }) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: type === "sender" ? "flex-end" : "flex-start",
        width: "100%",
      }}
    >
      <Box
        style={{
          color: "#fff",
          fontSize: fonts.font_18,
          maxWidth: "55%",
          display: "flex",
          flexDirection: "column",
          alignItems: type === "sender" ? "flex-end" : "flex-start",
          marginBottom: "1vw",
          boxSizing: "border-box",
        }}
      >
        <Box
          style={{
            backgroundColor: "#23262fff",
            padding: "0.7vw",
            borderRadius:
              type === "sender" ? "0.9vw 0 0.9vw 0.9vw" : "0 0.9vw 0.9vw 0.9vw",
          }}
        >
          <Box display="flex" flexDirection="column">
            {type === "receiver" && chat === "group" && (
              <Typography
                style={{
                  fontSize: fonts.font_16,
                  color: "#2f80edff",
                  marginBottom: "0.2vw",
                }}
              >{`~ ${authorName}`}</Typography>
            )}
            {content}
          </Box>
        </Box>
        <Box
          style={{
            fontSize: fonts.font_14,
            alignSelf: "end",
            padding: "0.3vw 0.4vw 0 0",
          }}
        >
          {getTimestamp(timestamp)}
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
