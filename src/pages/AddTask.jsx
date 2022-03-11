/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import AddTaskForm from "../components/addTask/AddTaskForm";

export default function AddTaskPage() {
  return (
    <DashboardContent title="Add Task">
      <AddTaskForm/>
    </DashboardContent>
  );
}
