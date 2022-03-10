import * as React from "react";
import DashboardContent from "../layouts/DashBoard";

const render = "This is from add-task page.";

export default function HomePage() {
  return <DashboardContent render={render} />;
}
