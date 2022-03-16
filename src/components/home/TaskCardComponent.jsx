/* react imports */
import React from "react";
import { useContext } from "react";
import { Context } from "./../../store";
import { Link as RouterLink } from "react-router-dom";
/* mui imports */
import { Card, CardContent, Stack, Link } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
/* widget/component imports */
import TaskCardBtn from "../../widgets/TaskCardBtn";

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
            <Stack spacing={2}>
              <TaskCardBtn
                text="Complete"
                color="success"
                icon={<DoneIcon />}
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
  );
}
/* color for info, success can be adjusted in palette.js */
