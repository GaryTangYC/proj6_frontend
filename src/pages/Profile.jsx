import * as React from "react";
import DashboardContent from "../layouts/DashBoard";
import ProfileAccordions from "../components/ProfileAccordion";

const title = "Profile";

// const render = "This is from profile page.";

export default function ProfilePage() {
  return <DashboardContent title={title} render={<ProfileAccordions />} />;
}
