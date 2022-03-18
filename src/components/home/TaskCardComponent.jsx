/* react imports */
import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Context } from "../../store";
import { Link as RouterLink, useNavigate } from "react-router-dom";
/* mui imports */
import { Card, CardContent, Stack, Link, Grid } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
/* widget/component imports */
import TaskCardBtn from "../../widgets/TaskCardBtn";
import axios from "axios";

export default function TaskCardComponent({ tasks, disabled }) {
  const navigate = useNavigate();
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
      {tasks.map((task) => {
        return (
          <Grid item xs={4}>
          <Card key={task._id}>
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
                {...disabled}                
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
          </Grid>
        );
      })}
    </>
  );
}
