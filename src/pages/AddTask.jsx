import * as React from "react";
import DashboardContent from "../layouts/DashBoard";

const title = "Add Task";

const render = "This is from add-task page.";

export default function AddTaskPage() {
  return <DashboardContent title={title} render={render} />;
}
