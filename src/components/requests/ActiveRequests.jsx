/* react imports */
import { useContext } from "react";
import { Context } from "./../../store";
/* mui imports */
import { Typography } from "@mui/material";
import RequestTaskCard from "../RequestsTaskCard";

export default function ActiveRequests() {
  const { store } = useContext(Context);
  const { partnerTasks } = store;
  const filterTasks = partnerTasks.filter(el => el.partnerAccepted === "true")
  
  return (
    <>
      {filterTasks.length > 0 ? (
        <RequestTaskCard tasks={filterTasks} />
      ) : (
        <Typography variant="h3">There are no active requests</Typography>
      )}
    </>
  );
}
