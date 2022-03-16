import { Card, CardContent, Stack, Grid } from "@mui/material";
import { useContext } from "react";
import { Context } from "./../../store";
import { parseJSON } from "date-fns";
import TaskCardBtn from "../../widgets/TaskCardBtn";
import DoneIcon from "@mui/icons-material/Done";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TaskCardComponent() {
  const { store } = useContext(Context);
  const { tasks } = store;
  const navigate = useNavigate();
  const postCompleteBckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/completeTask`;

  const CompleteFn = async (e) => {
    e.preventDefault();
    const taskId = e.currentTarget.value;
    console.log("button clicked");
    console.log("taskId", taskId);
    const postCompleteTask = await axios.post(postCompleteBckendUrl, {taskId});
    alert("Task Submitted as Complete")
    if (postCompleteTask.data.err) {
      return alert(postCompleteTask.data.err);
    }
    // Should we use useNavigate to reroute to home page which will re-update the task list?

  };

  return (
    <>
      {tasks.map((task) => {
        return (
          <Card key={task._id}>
            {/* <CardContent /> */}
            <CardContent>
              <h4>{task.description}</h4>
              <p>{task.endText}</p>
            </CardContent>
            {/* <Stack container spacing ={2}>
            < CompleteBtn text="Complete" onclick={CompleteFn} / >
            < AddPartnerBtn text="Add Partner" / >
            < ChatBtn text="Chat" / > */}
            <Stack spacing={2}>
              <TaskCardBtn
                text="Complete"
                color="success"
                icon={<DoneIcon />}
                // dataTestId={taskIdMap}
                onClick={CompleteFn}
                value={task._id}
              />
              <TaskCardBtn
                text="Add Partner"
                color="info"
                icon={<PersonAddIcon />}
              />
              <TaskCardBtn text="Chat" icon={<ChatIcon />} />
            </Stack>
          </Card>
        );
      })}
    </>
  );
}

/* color for info, success can be adjusted in palette.js */
