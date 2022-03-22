/* react imports */
import { useContext, useState, useEffect } from "react";
import { Context, renderRefresh } from "../../../store";
import { Link as RouterLink, useNavigate } from "react-router-dom";
/* mui imports */
import "../styles.css";
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
import TaskCardBtn from "../../../widgets/TaskCardBtn";
import axios from "axios";
import { format } from "date-fns";


export default function TaskCardComponent({ tasks }) {
  const { store, dispatch } = useContext(Context);
   const { user, token, refreshStatus} = store;
   const [refreshState, setRefreshState] = useState(refreshStatus)
   const navigate = useNavigate();
   const auth = { headers: { Authorization: `Bearer ${token}` } };
   const postCompleteBckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/completeTask`;

  // isTrue state to be passed to button components that needs to be disabled
  const [isTrue, setIsTrue] = useState(true);

  
  const CompleteFn = async (e) => {
    e.preventDefault();
    const taskId = e.currentTarget.value;
    console.log("button clicked");
    console.log("taskId", taskId);
    const postCompleteTask = await axios.post(postCompleteBckendUrl, {
      taskId
    }, auth);
    alert("Task Submitted");
    if (postCompleteTask.data.err) {
      return alert(postCompleteTask.data.err);
    }
    const updateState = !refreshState
    dispatch(renderRefresh(updateState));
    navigate("/home");
  };
  
//   useEffect(() => {
//   console.log('refreshstate in useEffect', refreshState);
// }, [refreshState]);


  return (
    <>
      {tasks.map((task, index) => {
        let date = new Date(task.completion);
        date = format(date, "E, dd-MMM-yy, h:mm a");

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
              sx={{ minHeight: 20, maxHeight: 20 }}
            />
            <CardContent sx={{ overflow: "auto" }}>
              <b>Description: </b>
              <p>{task.description}</p>
              <p></p>
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
                  <TaskCardBtn disabled
                    text="Add"
                    color="info"
                    icon={<PersonAddIcon />}
                  />
                </Link>
                <Link>
                  <TaskCardBtn 
                    text="Chat"
                    icon={<ChatIcon />}
                    onClick={() => {
                      navigate("/chats", {
                        /* need to standardize info sent thru here, so other pages can send in e same format */
                        state: {
                          taskId: task._id,
                          taskOwner: task.owner,
                          taskDescription: task.description,
                          taskPartner: task.partner._id,
                          partnerPic: task.partner.pic,
                        },
                      });
                    }}
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
