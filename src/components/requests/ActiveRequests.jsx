/* react imports */
import { useContext } from "react";
import { Context } from "./../../store";
/* mui imports */
import TaskCardComponent from "../home/TaskCardComponent";


export default function ActiveRequests() {
  const { store } = useContext(Context);
  const { tasks } = store;

  return (
    
    <TaskCardComponent tasks={tasks}/>
    
  );
}
