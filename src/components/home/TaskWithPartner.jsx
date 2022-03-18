/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../store";
/* mui imports */
import { Typography}  from "@mui/material";
/* widget/component imports */
import TaskCardComponent from "./TaskCardComponent";

export default function TaskWithPartner() {
  const { store } = useContext(Context);
  const { tasks } = store;

  const [filteredTasks1, setFilteredTasks] = useState(
    tasks.filter((task) => task.partner !== null && task.completed === false && task.partnerAccepted === "true" && task.endIndicated === false )
  );

    const [filteredTasks2, setFilteredTasks2] = useState(
    tasks.filter((task) => task.partner !== null && task.completed === false && task.partnerAccepted === "true" && task.endIndicated === true)
  );
      console.log('this is filter task with partner',filteredTasks1)

      console.log('this is filter task with partner - pending AP complete',filteredTasks2)
  return (
    <>
      <h2>Ongoing Tasks</h2>
      {filteredTasks1.length>0 ? (
      <TaskCardComponent tasks={filteredTasks1} />
      ): (<Typography variant="h3">No Ongoing Task</Typography>)}
      <br />
      < hr/>
      <h2>Pending Acknowledgement For Completion</h2>
      {filteredTasks2.length>0 ? (
      <TaskCardComponent tasks={filteredTasks2} />
           ): (<Typography variant="h3">No Pending Task </Typography>)}
    </>
  );
}
