import * as React from "react";
import DashboardContent from "../layouts/DashBoard";

const title = "Home";

const render = "This is from home page again w/o typography.";

export default function HomePage() {
  return <DashboardContent title={title} render={render} />;
}
