import { Card, CardContent, Stack, Grid } from "@mui/material";
import { useContext } from "react";
import { Context } from "./../../store";
import TaskCardBtn from "../../widgets/TaskCardBtn";
import DoneIcon from "@mui/icons-material/Done";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function TaskCardComponent() {
  const { store } = useContext(Context);
  const { tasks } = store;
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
            <Stack container spacing={2}>
              <TaskCardBtn
                text="Complete"
                color="success"
                icon={<DoneIcon />}
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
