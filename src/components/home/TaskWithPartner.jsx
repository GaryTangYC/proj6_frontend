/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../store";
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
      <TaskCardComponent tasks={filteredTasks1} />
      <hr/ >
      <h2>Pending Partner Acceptance of Completion</h2>
      <TaskCardComponent tasks={filteredTasks2} />
    </>
  );
}
