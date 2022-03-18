/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../store";
/* widget/component imports */
import TaskCardComponent from "./TaskCardComponent";
import { Grid } from "@mui/material";

export default function TaskWithPartner() {
  const { store } = useContext(Context);
  const { tasks } = store;

  const [filteredTasks, setFilteredTasks1] = useState(
    tasks.filter((task) => task.partner === null && task.completed === false)
  );

  console.log('this is filter task with no partner',filteredTasks)
  return (
    <>
      <TaskCardComponent tasks={filteredTasks} />
    </>
  );
}
