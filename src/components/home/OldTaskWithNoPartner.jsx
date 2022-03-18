/* react imports */
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Context } from "./../../store";
import { Link as RouterLink, useNavigate } from "react-router-dom";
/* mui imports */
import { Card, CardContent, Stack, Link, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
/* widget/component imports */
import TaskCardBtn from "../../widgets/TaskCardBtn";
import axios from "axios";

export default function TaskWithNoPartner() {
  const { store } = useContext(Context);
  const { tasks } = store;
  const [taskFiltering, setTaskFiltering] = useState([]);
  const navigate = useNavigate();
  const postCompleteBckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/completeTask`;

  useEffect(() => {
    let taskStorage = [...tasks];
    console.log("taskStorage", taskStorage);
    let filteredTask = taskStorage.filter((task) => task.partner !== null && task.completed === false);
    setTaskFiltering(filteredTask);
  }, []);
  
  console.log("filtertask with no partner", taskFiltering);

  const CompleteFn = async (e) => {
    e.preventDefault();
    const taskId = e.currentTarget.value;
    console.log("button clicked");
    console.log("taskId", taskId);
    const postCompleteTask = await axios.post(postCompleteBckendUrl, {
      taskId,
    });
    alert("Task Submitted as Complete");
    if (postCompleteTask.data.err) {
      return alert(postCompleteTask.data.err);
    }
  };

  return (
    // <>
    // {!taskFiltering ? ( 
      <>
      {taskFiltering.map((task) => {
        return (
          <Card key={task._id}>
            {/* <CardContent /> */}
            <CardContent>
              <h4>{task.description}</h4>
              <p>{task.endText}</p>
            </CardContent>
            <Stack spacing={2}>
              <TaskCardBtn
                text="Complete"
                color="success"
                icon={<DoneIcon />}
                onClick={CompleteFn}
                value={task._id}
              />
              <Link
                underline="none"
                component={RouterLink}
                to={`/addpartner/${task._id}`}
              >
                <TaskCardBtn
                  text="Add Partner"
                  color="info"
                  icon={<PersonAddIcon />}
                />
              </Link>
              <TaskCardBtn text="Chat" icon={<ChatIcon />} />
            </Stack>
          </Card>
        );
      })} 
      </>
  //     ) : (
  //       <p>There are no active requests</p>
  //     )}
  //   </>
  );
}
