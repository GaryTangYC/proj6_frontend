import * as React from "react";
import DashboardContent from "../layouts/DashBoard";

const title = "Profile";

const render = "This is from profile page.";

export default function ProfilePage() {
  return <DashboardContent title={title} render={render} />;
}
