import { Avatar, Box } from "@mui/material";
import { fonts } from "../common/utils";

const SeachResult = ({ name, email, id, onClick }) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.7vw",
        backgroundColor: "#3b3e46ff",
        borderRadius: "0.4vw",
        cursor: "pointer",
      }}
      onClick={onClick}
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
          {name.charAt(0).toUpperCase()}
        </Avatar>
      </Box>
      <Box
        style={{
          display: "flex",
          width: "80%",
          flexDirection: "column",
        }}
      >
        <Box
          style={{
            color: "#fff",
            fontSize: fonts.font_18,
            padding: "0.2vw 0",
          }}
        >
          {name}
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
          {email}
        </Box>
      </Box>
    </Box>
  );
};

export default SeachResult;
