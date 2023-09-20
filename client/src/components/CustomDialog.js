import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { fonts } from "../common/utils";
import SeachResult from "./SearchResult";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setActiveChatName, setSelectedChat } from "../store/chat";

const CustomDialog = ({
  open,
  setOpen,
  setSearchQuery,
  searchQuery,
  searchResults,
  resetSearch,
}) => {
  const [addedPart, setAddedPart] = useState([]);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [error, setError] = useState({ part: undefined, name: undefined });

  const dispatch = useDispatch();

  const handleNextStep = () => {
    if (step === 0) {
      if (addedPart.length === 0) {
        setError((prevState) => {
          return { ...prevState, part: "Please select at least 1 participant" };
        });
        return;
      }
      setError({ part: undefined, name: undefined });
      setStep(1);
    } else {
      if (name === "") {
        setError((prevState) => {
          return { ...prevState, name: "Name cannot be empty" };
        });
        return;
      }
      setError({ part: undefined, name: undefined });

      let participants = addedPart.map((part) => part._id);
      participants.push(sessionStorage.getItem("chattyUserId"));

      axios
        .post("https://chatapp-ochre-tau.vercel.app/api/v1/find/groupChat", {
          name,
          participants,
        })
        .then((resp) => {
          dispatch(setActiveChatName({ name: resp.data.name }));
          dispatch(setSelectedChat({ selectedChat: resp.data }));
          setSearchQuery("");
          setOpen(false);
          resetSearch();
        })
        .catch((e) => console.log(e));
    }
  };

  const handleAddPart = (val) => {
    if (!addedPart.find((part) => part._id === val._id))
      setAddedPart((prevState) => {
        return [...prevState, val];
      });
  };

  return (
    <Dialog
      open={open}
      sx={{
        "& .MuiPaper-root": {
          background: "#3b3e46ff",
        },
      }}
      onClose={() => setOpen(false)}
    >
      <DialogTitle
        style={{ fontSize: fonts.font_26, color: "#fff", fontFamily: "Ubuntu" }}
      >
        New Group
      </DialogTitle>
      <DialogContent>
        {step === 0 && (
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Add..."
            fullWidth
            inputProps={{
              style: {
                color: "#fff",
                fontSize: fonts.font_18,
                backgroundColor: "#3b3e46ff",
                padding: "1vw",
                borderRadius: "0.7vw",
                fontFamily: "Ubuntu",
              },
            }}
            InputProps={{ style: { borderRadius: "0.7vw" } }}
            style={{ position: "sticky", top: 0, marginBottom: "0.7vw" }}
            helperText={error.part}
            FormHelperTextProps={{
              style: {
                color: "red",
                fontSize: fonts.font_18,
                backgroundColor: "#3b3e46ff",
                fontFamily: "Ubuntu",
              },
            }}
          />
        )}

        {addedPart.length > 0 && (
          <Box mb="0.7vw">
            <Typography
              style={{
                fontSize: fonts.font_18,
                color: "#fff",
                marginBottom: "0.3vw",
                fontFamily: "Ubuntu",
              }}
            >
              Participants
            </Typography>
            <Box
              display="flex"
              gap="0.5vw"
              style={{ overflowX: "scroll", maxWidth: "15vw" }}
              sx={{
                "::-webkit-scrollbar": { height: "3px", borderRadius: "0.2vw" },
                "::-webkit-scrollbar-thumb": { backgroundColor: "#2f80edff" },
              }}
            >
              {addedPart.map((part) => (
                <Tooltip title={part.name}>
                  <Avatar
                    sx={{
                      width: "2vw",
                      height: "2vw",
                      fontSize: fonts.font_24,
                      color: "#3b3e46ff",
                    }}
                  >
                    {part.name.charAt(0).toUpperCase()}
                  </Avatar>
                </Tooltip>
              ))}
            </Box>
          </Box>
        )}

        {step === 0 ? (
          <>
            {searchResults.length > 0 && (
              <Typography
                style={{
                  fontSize: fonts.font_18,
                  color: "#fff",
                  marginBottom: "0.3vw",
                  fontFamily: "Ubuntu",
                }}
              >
                Results
              </Typography>
            )}
            <Box
              style={{
                overflowX: "hidden",
                overflowY: "scroll",
                maxHeight: "15vw",
                display: "flex",
                flexDirection: "column",
                gap: "0.4vw",
              }}
              sx={{
                "::-webkit-scrollbar": { display: "none" },
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              }}
            >
              {open &&
                searchResults.map((item) => (
                  <SeachResult
                    name={item.name}
                    email={item.email}
                    id={item._id}
                    onClick={() => {
                      handleAddPart(item);
                    }}
                  />
                ))}
            </Box>
          </>
        ) : (
          <TextField
            placeholder="Group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            inputProps={{
              style: {
                color: "#fff",
                fontSize: fonts.font_18,
                backgroundColor: "#3b3e46ff",
                padding: "1vw",
                borderRadius: "0.7vw",
                fontFamily: "Ubuntu",
              },
            }}
            InputProps={{ style: { borderRadius: "0.7vw" } }}
            helperText={error.name}
            FormHelperTextProps={{
              style: {
                color: "red",
                fontSize: fonts.font_18,
                backgroundColor: "#3b3e46ff",
                fontFamily: "Ubuntu",
              },
            }}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button
          style={{
            fontSize: fonts.font_18,
            borderRadius: "0.4vw",
            color: "#2f80edff",
          }}
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        {step === 1 && (
          <Button
            style={{
              fontSize: fonts.font_18,
              borderRadius: "0.4vw",
              color: "#2f80edff",
            }}
            onClick={() => setStep(0)}
          >
            Back
          </Button>
        )}
        <Button
          style={{
            fontSize: fonts.font_18,
            borderRadius: "0.4vw",
            color: "#2f80edff",
          }}
          onClick={handleNextStep}
        >
          {step === 0 ? "Next" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
