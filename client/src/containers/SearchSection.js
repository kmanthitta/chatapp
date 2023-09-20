import { ArrowBack, Group } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { useDebounce } from "../common/useDebounce";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { fonts, getActiveChatName } from "../common/utils";
import SeachResult from "../components/SearchResult";
import CustomDialog from "../components/CustomDialog";
import { useDispatch } from "react-redux";
import { setActiveChatName, setSelectedChat } from "../store/chat";

const SearchSection = ({ resetSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const debouncedValue = useDebounce(searchQuery, 700);

  const dispatch = useDispatch();

  const setQuery = (val) => {
    setSearchQuery(val);
  };

  const handleStartChat = (id) => {
    axios
      .get(
        `api/v1/find/chat?userId=${sessionStorage.getItem(
          "chattyUserId"
        )}&withUserId=${id}`
      )
      .then((res) => {
        dispatch(setActiveChatName({ name: getActiveChatName(res.data) }));
        dispatch(setSelectedChat({ selectedChat: res.data }));
        setSearchQuery("");
        resetSearch();
        setSearchResults([]);
      })
      .catch((error) => console.log(error));
  };

  const search = useCallback(() => {
    if (searchQuery === "") {
      setSearchResults([]);
    } else {
      axios
        .get(
          `api/v1/find/users?myId=${sessionStorage.getItem(
            "chattyUserId"
          )}&name=${searchQuery}`
        )
        .then((res) => {
          setSearchResults(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [debouncedValue]);

  useEffect(() => {
    search();
  }, [debouncedValue, search]);

  const setOpen = (val) => {
    setOpenDialog(val);
  };

  return (
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
      <Box style={{ display: "flex" }}>
        <ArrowBack
          sx={{
            width: "1.6vw",
            height: "1.6vw",
            color: "#fff",
            alignSelf: "center",
            padding: "0.2vw",
            cursor: "pointer",
          }}
          onClick={() => {
            setSearchQuery("");
            resetSearch();
            setSearchResults([]);
          }}
        />
        <TextField
          value={openDialog ? "" : searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Chat with..."
          inputProps={{
            style: {
              color: "#fff",
              fontSize: fonts.font_18,
              backgroundColor: "#3b3e46ff",
              padding: "1vw",
              borderRadius: "0.7vw",
            },
          }}
          InputProps={{ style: { borderRadius: "0.7vw" } }}
        />{" "}
      </Box>
      <Box
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          height: "100%",
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
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0.7vw",
            borderRadius: "0.4vw",
            cursor: "pointer",
          }}
          onClick={() => setOpenDialog(true)}
        >
          <Box style={{ alignSelf: "center" }}>
            <IconButton
              sx={{
                backgroundColor: "#2f80edff",
                borderRadius: "2vw",
                height: "2.2vw",
                width: "2.2vw",
                ":hover": {
                  bgcolor: "#2f80edff",
                },
              }}
            >
              <Group
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
          <Box
            style={{
              display: "flex",
              width: "80%",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                color: "#fff",
                fontSize: fonts.font_18,
                padding: "0.2vw 0",
              }}
            >
              New Group
            </Box>
          </Box>
        </Box>
        {!openDialog &&
          searchResults.map((item) => (
            <SeachResult
              name={item.name}
              email={item.email}
              id={item._id}
              onClick={() => {
                handleStartChat(item._id);
              }}
            />
          ))}
      </Box>

      <CustomDialog
        open={openDialog}
        setOpen={setOpen}
        setSearchQuery={setQuery}
        searchQuery={searchQuery}
        searchResults={searchResults}
        resetSearch={resetSearch}
      />
    </Box>
  );
};

export default SearchSection;
