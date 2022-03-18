/* react imports */
import { useContext, useState } from "react";
import { Context } from "./../../store";
/* mui imports */
import {
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
      removeTask();
    };

    /* change completed field to true */
    const updateAgreeComplete = async () => {
      await axios.post(
        `${baseBckendUrl}/task/completeTask`,
        { taskId: el._id },
        auth
      );
    };

    /* change completed field to ???? */
    const updateRejectComplete = async () => {
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
      <List component="div" disablePadding>
        <ListItem>
          <ListItemText>
            <Typography variant="h5">Owner: {el.owner.name}</Typography>
            <Typography>Tag: {el.taskTag}</Typography>
            <Typography>Completion Date: {date}</Typography>
            <Typography>Description: {el.description}</Typography>
            <Typography>Penalties: {el.endText}</Typography>
            <Typography>Financial Penalties: {el.financialPenalty}</Typography>
          </ListItemText>
          {el.endIndicated && (
            <IconButton onClick={() => {agreeComplete()}}>
              <CheckCircleOutlineIcon />
            </IconButton>
          )}
          {el.endIndicated && (
            <IconButton onClick={() => {}}>
              <DeleteIcon />
            </IconButton>
          )}
        </ListItem>
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

/* old code... */
// /* react imports */
// import { useContext } from "react";
// import { Context } from "./../../store";
// /* mui imports */
// import { Typography } from "@mui/material";
// import RequestTaskCard from "../RequestsTaskCard";

// export default function ActiveRequests() {
//   const { store } = useContext(Context);
//   const { partnerTasks } = store;
//   const filterTasks = partnerTasks.filter(el => el.partnerAccepted === "true")

//   return (
//     <>
//       {filterTasks.length > 0 ? (
//         <RequestTaskCard tasks={filterTasks} />
//       ) : (
//         <Typography variant="h3">There are no active requests</Typography>
//       )}
//     </>
//   );
// }
