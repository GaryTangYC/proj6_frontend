/* react imports */
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Context } from "../../store";
import { Link as RouterLink, useNavigate } from "react-router-dom";
/* mui imports */
import "./styles.css";
import {
  Card,
  CardContent,
  Stack,
  Link,
  Grid,
  CardActions,
  CardHeader,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
/* widget/component imports */
import TaskCardBtn from "../../widgets/TaskCardBtn";
import axios from "axios";
import { format } from "date-fns";

export default function TaskCardComponent({ tasks }) {
  const navigate = useNavigate();
  // isTrue state to be passed to button components that needs to be disabled
  const [isTrue, setIsTrue] = useState(true);
  const postCompleteBckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/completeTask`;

  const CompleteFn = async (e) => {
    e.preventDefault();
    const taskId = e.currentTarget.value;
    console.log("button clicked");
    console.log("taskId", taskId);
    const postCompleteTask = await axios.post(postCompleteBckendUrl, {
      taskId,
    });
    alert("Task Submitted");
    if (postCompleteTask.data.err) {
      return alert(postCompleteTask.data.err);
    }
    navigate("/home");
  };

  return (
    <>
      {tasks.map((task, index) => {
        let date = new Date(task.completion);
        date = format(date, "E,dd-MMM-yy, h:mm a");

        return (
          <Card
            key={task._id}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              minWidth: 300,
              maxWidth: 300,
              minHeight: 450,
              maxHeight: 450,
            }}
          >
            <CardHeader
              title={task.description}
              sx={{ minHeight: 100, maxHeight: 100,  overflow: "auto"  }}
            />
            <CardContent sx={{ overflow: "auto" }}>
              <p>
                <b>Task Tag: </b>
              </p>
              <p>{task.taskTag}</p>
              <p>
                <b>Rewards / Penalty: </b>
              </p>
              <p>{task.endText}</p>
              <p>
                <b>To Complete:</b>
              </p>
              <p> {date}</p>
            </CardContent>
            <Stack>
              <CardActions>
                {/* Empty Link required to wrap TaskCardBtn to space button evenly */}
                <Link>
                  <TaskCardBtn
                    text="Done"
                    color="success"
                    icon={<DoneIcon />}
                    onClick={CompleteFn}
                    value={task._id}
                  />
                </Link>
                <Link
                  underline="none"
                  component={RouterLink}
                  to={`/addpartner/${task._id}`}
                >
                  <TaskCardBtn
                    text="Add"
                    color="info"
                    icon={<PersonAddIcon />}
                  />
                </Link>
                <Link>
                  <TaskCardBtn
                    text="Chat"
                    icon={<ChatIcon />}
                    disabled={isTrue}
                  />
                </Link>
              </CardActions>
            </Stack>
          </Card>
        );
      })}
    </>
  );
}
