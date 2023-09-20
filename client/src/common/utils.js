import axios from "axios";
import moment from "moment";

export const fonts = {
  font_12: "0.625vw",
  font_14: "0.729vw",
  font_16: "0.833vw",
  font_18: "0.938vw",
  font_20: "1.042vw",
  font_22: "1.146vw",
  font_24: "1.250vw",
  font_26: "1.354vw",
};

export const getTimestamp = (timestamp) => {
  return moment.utc(timestamp).local().format("hh:mm A");
  // return moment.utc(timestamp).local().format("HH:mm");
};

export const getDateMonth = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getActiveChatName = (chat) => {
  return chat.name === ""
    ? chat.participants.filter(
        (part) => part._id !== sessionStorage.getItem("chattyUserId")
      )[0].name
    : chat.name;
};

export const readChat = (chatId, count) => {
  axios.post(
    `https://chatapp-ochre-tau.vercel.app/api/v1/chat/read?userId=${sessionStorage.getItem(
      "chattyUserId"
    )}&chatroomId=${chatId}&count=${count}`
  );
};
