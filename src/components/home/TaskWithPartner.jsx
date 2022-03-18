/* react imports */
import { useEffect, useContext, useState } from "react";
import { Context } from "../../store";
import { Link as RouterLink, useNavigate } from "react-router-dom";
/* mui imports */
import { Card, CardContent, Stack, Link, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
/* widget/component imports */
import TaskCardBtn from "../../widgets/TaskCardBtn";
import axios from "axios";
import TaskCardComponentRefactor from "./TaskCardComponent";

export default function TaskWithPartner() {
  const { store } = useContext(Context);
  const { token, tasks } = store;

  const [filteredTasks, setFilteredTasks] = useState(
    tasks.filter((task) => task.partner !== null && task.completed === false)
  );
  const navigate = useNavigate();
      console.log('this is filter task with partner',filteredTasks)
  return (
    <>
      <TaskCardComponentRefactor tasks={filteredTasks} />
    </>
  );
}
