import { Box } from "@mui/material";
import { fonts, getDateMonth } from "../common/utils";

const DateChip = ({ date }) => {
  let chipData = getDateMonth(date);

  return (
    <Box
      width="100%"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          backgroundColor: "#23262f",
          color:'#fff',
          padding:'0.4vw',
          fontSize:fonts.font_16,
          borderRadius:'0.4vw'
        }}
      >
        {chipData}
      </Box>
    </Box>
  );
};

export default DateChip;
