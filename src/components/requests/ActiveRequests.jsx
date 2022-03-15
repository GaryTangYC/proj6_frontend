/* react imports */
import { useContext } from "react";
import { Context } from "./../../store";
/* mui imports */
import { Typography } from "@mui/material";
import RequestTaskCard from "../RequestsTaskCard";

export default function ActiveRequests() {
  const { store } = useContext(Context);
  const { partnerTasks } = store;

  return (
    <>
      {partnerTasks.length > 0 ? (
        <RequestTaskCard tasks={partnerTasks} />
      ) : (
        <Typography variant="h2">There are no active requests</Typography>
      )}
    </>
  );
}
