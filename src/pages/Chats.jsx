/* react imports */
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "./../store";
import { useNavigate, useLocation } from "react-router-dom";
/* mui imports */
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
/* other imports */
import io from "socket.io-client";
import { format } from "date-fns";
import axios from "axios";

export default function ChatsPage() {
  /* create socket on entry into page so it can be used globally  */
  const socket = io.connect(process.env.REACT_APP_BCKEND_BASE_URI);
  const { store } = useContext(Context);
  const { user, token } = store;
  /* bckend urls + auth */
  const baseBckendUrl = process.env.REACT_APP_BCKEND_BASE_URI;
  const baseImageUrl = process.env.REACT_APP_IMAGE_BASE_URI;
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  /* used to hold array of either senderChatText or receiverChatText so display can be udpated */
  const [conversation, setConversation] = useState([]);
  /* get info sent over in location.state when navigated to this page */
  const location = useLocation();
  const { taskId, taskOwner, taskDescription, taskPartner, partnerPic } =
    location.state;

  /* fig out who e receiver shld be */
  let receiver;
  if (user._id === taskOwner) {
    receiver = taskPartner;
  } else {
    receiver = taskOwner;
  }
  /* navigate back to previous page */
  const navigate = useNavigate();
  /* ref to get input from textfield */
  const textInput = useRef();

  useEffect(() => {
    socket.emit("start_chat", {
      taskId,
      sender: user._id,
    });

    /* populate conversation with chat history */
    (async () => {
      const data = await axios.get(
        `${baseBckendUrl}/chats/${taskId}/${taskOwner}/${taskPartner}`,
        auth
      );

      const chatHistory = data.data.map((chat) => {
        let timeStamp = new Date(chat.createdAt);
        timeStamp = format(timeStamp, "k:m, E,dd-MMM-yy");
        return { msg: chat.msg, sender: chat.sender, timeStamp };
      });

      setConversation((prevMsgs) => [...prevMsgs, ...chatHistory]);
    })();

    /* disconnnect when page unmounts i.e. user navigates away from page */
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMsg = () => {
    const msg = textInput.current.value.toLowerCase();
    if (msg === "") {
      return alert(
        "dude u need to actually type something before sending a msg"
      );
    }
    socket.emit("send_msg", { msg, sender: user._id, receiver, taskId });
    textInput.current.value = "";
  };

  const SenderChatText = ({ msg, timeStamp }) => {
    return (
      <ListItemText align="right" secondary={timeStamp}>
        <ListItemAvatar>
          <Avatar src={`${baseImageUrl}${user.pic}`} />
        </ListItemAvatar>
        {msg}
      </ListItemText>
    );
  };

  const ReceiverChatText = ({ msg, timeStamp }) => {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={`${baseImageUrl}${partnerPic}`} />
        </ListItemAvatar>
        <ListItemText align="left" secondary={timeStamp}>
          {msg}
        </ListItemText>
      </ListItem>
    );
  };

  socket.on("bdcast_msg", (data) => {
    /* setState MUST use format below or it will cont be overwritten (https://stackoverflow.com/questions/66648291/react-socket-io-socket-on-event-is-not-updating-state-properly) */

    let timeStamp = new Date(data.timeStamp);
    timeStamp = format(timeStamp, "k:m, E,dd-MMM-yy");
    setConversation((prevMsgs) => [
      ...prevMsgs,
      { msg: data.msg, sender: data.sender, timeStamp },
    ]);
  });

  /* this bit of code populates the chat display */
  let chatList;
  if (conversation.length > 0) {
    chatList = conversation.map((text, index) => {
      if (user._id === text.sender) {
        return (
          <SenderChatText
            msg={text.msg}
            timeStamp={text.timeStamp}
            key={index}
          />
        );
      }
      return (
        <ReceiverChatText
          msg={text.msg}
          timeStamp={text.timeStamp}
          key={index}
        />
      );
    });
  }

  return (
    <DashboardContent>
      {conversation.length === 0 ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography align="center" variant="h5">
            {taskDescription}'s chat
          </Typography>
          <Divider sx={{ mt: 1 }} />
          <List>{chatList}</List>
          <TextField
            id="msg_input"
            placeholder="write your msg here"
            inputRef={textInput}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      sendMsg();
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </>
      )}
    </DashboardContent>
  );
}

//   This chat belongs to {taskInfo._id} with description{" "}
//   {taskInfo.description}
// </>
// <>
//   Owner of this task is {taskInfo.owner.name} with id {taskInfo.owner._id}
// </>
// <>
//   Person who started this chat is {user.name} with id {user._id}
