/* react imports */
import { useContext, useState } from "react";
import { Context } from "./../../store";
/* mui imports */
import {
  Typography,
  List,
  ListItem,
  Collapse,
  IconButton,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
/* other imports */
import { format } from "date-fns";
import axios from "axios";

export default function PendingRequests() {
  const { store } = useContext(Context);
  const { token, partnerTasks } = store;
  /* use local state to store filtered tasks so requests tt are accepted/rejected can be removed from display */
  const [filteredTasks, setFilteredTasks] = useState(
    partnerTasks.filter((el) => el.partnerAccepted === "pending")
  );

  function PendingTaskList({ el }) {
    /* bckend urls + auth */
    const baseBckendUrl = process.env.REACT_APP_BCKEND_BASE_URI;
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    /* state to control opening of sublist */
    const [open, setOpen] = useState(false);
    /* format date string returned from mongoose */
    let date = new Date(el.completion);
    date = format(date, "E,dd-MMM-yy");

    /* acceptPartner onclick function */
    const acceptPartner = () => {
      updateAcceptPartner();
      removeTask();
    };

    /* rejectPartner onclick function */
    const rejectPartner = async () => {
      updateRejectPartner();
      removeTask();
    };

    /* change partnerAccepted field to true */
    const updateAcceptPartner = async () => {
      await axios.put(
        `${baseBckendUrl}/task/partnerRequest`,
        { taskId: el._id, userId: el.owner._id, status: "true" },
        auth
      );
    };

    /* change partnerAccepted field to rejected */
    const updateRejectPartner = async () => {
      await axios.put(
        `${baseBckendUrl}/task/partnerRequest`,
        { taskId: el._id, userId: el.owner._id, status: "rejected" },
        auth
      );
    };

    const removeTask = () => {
      setFilteredTasks(filteredTasks.filter((task) => task._id !== el._id));
    };
    return (
      <List>
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              onClick={() => {
                setOpen(!open);
              }}
            >
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          }
        >
          <IconButton onClick={() => acceptPartner()}>
            <CheckCircleOutlineIcon />
          </IconButton>
          <IconButton onClick={() => rejectPartner()}>
            <DeleteIcon />
          </IconButton>
          <ListItemText>Owner: {el.owner.name}</ListItemText>
          <ListItemText>Tag: {el.taskTag}</ListItemText>
          <ListItemText>Completion Date: {date} </ListItemText>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemText>Description: {el.description}</ListItemText>
            <ListItemText>Penalties: {el.endText}</ListItemText>
            <ListItemText>
              Financial Penalties: {el.financialPenalty}
            </ListItemText>
          </List>
        </Collapse>
      </List>
    );
  }

  return (
    <>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((el, index) => (
          <PendingTaskList el={el} key={index} />
        ))
      ) : (
        <Typography variant="h3">There are no pending requests</Typography>
      )}
    </>
  );
}
