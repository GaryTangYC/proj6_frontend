/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import AddTaskForm from "../components/addTask/AddTaskForm";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function AddTaskPage() {
  return (
    <DashboardContent>
      <AddTaskForm/>
    </DashboardContent>
  );
}
