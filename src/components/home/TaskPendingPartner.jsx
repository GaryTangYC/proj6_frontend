/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../store";
/* widget/component imports */
import TaskCardComponent from "./TaskCardComponent";

export default function TaskPendingPartner() {
  const { store } = useContext(Context);
  const { tasks } = store;

  /**
   * Filters for pending partner acceptance to be the accountable partner
   */
  const [filteredTasks1, setFilteredTasks1] = useState(
    tasks.filter((task) => task.partner !== null && task.partnerAccepted === "pending" && task.completed === false)
  );

    /**
   * Filters for pending partner acceptance to be the accountable partner
   */
  const [filteredTasks2, setFilteredTasks2] = useState(
    tasks.filter((task) => task.partner !== null && task.partnerAccepted === 'rejected' && task.completed === false)
  );


  console.log('this is filter task with no partner',filteredTasks1)
  return (
    <>
      <h2>Pending Partner Acceptance</h2>
      <TaskCardComponent tasks={filteredTasks1} />
      <hr />
      <h2>Partner Rejected</h2>
      <TaskCardComponent tasks={filteredTasks2} />
    </>
  );
}
