/* react imports */
import { useContext, useState } from "react";
import { Context } from "./../../store";
import { useNavigate } from "react-router-dom";
/* mui imports */
import {
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ChatIcon from "@mui/icons-material/Chat";
/* other imports */
import { format } from "date-fns";
import axios from "axios";

export default function ActiveRequests() {
  const { store } = useContext(Context);
  const { token, partnerTasks } = store;
  /* 
  1.use local state to store filtered tasks so requests tt are accepted/rejected can be removed from display
  2. dun need to filter for completion status cos partnerTasks only contains tasks w completion status false  
  */
  const [filteredTasks, setFilteredTasks] = useState(
    partnerTasks.filter((el) => el.partnerAccepted === "true")
  );

  function PendingTaskList({ el }) {
    /* to link to chat page when click on chat btn */
    const navigate = useNavigate();
    /* bckend urls + auth */
    const baseBckendUrl = process.env.REACT_APP_BCKEND_BASE_URI;
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    /* format date string returned from mongoose */
    let date = new Date(el.completion);
    date = format(date, "E,dd-MMM-yy");

    /* agreeComplete onclick function */
    const agreeComplete = () => {
      updateAgreeComplete();
      removeTask();
    };

    /* rejectComplete onclick function */
    const rejectComplete = async () => {
      updateRejectComplete();
      updateTask();
    };

    /* change completed field to true */
    const updateAgreeComplete = async () => {
      await axios.post(
        `${baseBckendUrl}/task/completeTask`,
        { taskId: el._id },
        auth
      );
    };

    /* change endIndicated field to false */
    const updateRejectComplete = async () => {
      await axios.put(
        `${baseBckendUrl}/task/rejectCompletion`,
        { taskId: el._id },
        auth
      );
    };

    const removeTask = () => {
      setFilteredTasks(filteredTasks.filter((task) => task._id !== el._id));
    };

    const updateTask = () => {
      setFilteredTasks(
        filteredTasks.map((task) => {
          if (el._id === task._id) {
            return { ...task, endIndicated: false };
          }
          return task;
        })
      );
    };

    /* chat onclick function */
    const startChat = () => {
      navigate("/chats", {
        /* need to standardize info sent thru here, so other pages can send in e same format */
        state: {
          taskId: el._id,
          taskOwner: el.owner._id,
          taskDescription: el.description,
          taskPartner: el.partner,
          partnerPic: el.owner.pic,
        },
      });
    };

    return (
      <Box m={3}>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemText>
              <Typography variant="h5">Owner: {el.owner.name}</Typography>
              <Typography>Tag: {el.taskTag}</Typography>
              <Typography>Completion Date: {date}</Typography>
              <Typography>Description: {el.description}</Typography>
              <Typography>Penalties: {el.endText}</Typography>
              <Typography>
                Financial Penalties: {el.financialPenalty ? "Yes" : "None"}
              </Typography>
            </ListItemText>
            <IconButton onClick={() => startChat()}>
              <ChatIcon />
            </IconButton>
            {el.endIndicated && (
              <IconButton
                onClick={() => {
                  agreeComplete();
                }}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            )}
            {el.endIndicated && (
              <IconButton
                onClick={() => {
                  rejectComplete();
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </ListItem>
        </List>
      </Box>
    );
  }

  return (
    <>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((el, index) => (
          <PendingTaskList el={el} key={index} />
        ))
      ) : (
        <Box m={3}>
          <Typography variant="h3">There are no pending requests</Typography>
        </Box>
      )}
    </>
  );
}
