import * as React from "react";
import DashboardContent from "../layouts/DashBoard";

const title = "Chats";

const render = "This is from chats page.";

export default function ChatsPage() {
  return <DashboardContent title={title} render={render} />;
}
