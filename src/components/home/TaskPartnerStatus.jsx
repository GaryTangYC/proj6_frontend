/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../store";
/* mui imports */
import { Grid, Container, Typography } from "@mui/material";
/* widget/component imports */
import TaskCardComponent from "./TaskCardComponent";

export default function TaskPartnerStatus() {
  const { store } = useContext(Context);
  const { tasks } = store;

  // Store data in a const
  const storeData = [...tasks];

  /**
   * Filters for pending partner acceptance to be the accountable partner
   */
  let pendingPartnerAcceptData = storeData.filter(
    (task) =>
      task.partner !== null &&
      task.partnerAccepted === "pending" &&
      task.completed === false
  );

  /**
   * Filters for pending partner acceptance to be the accountable partner
   */
  let pendingPartnerRejectData = storeData.filter(
    (task) =>
        task.partner !== null &&
        task.partnerAccepted === "rejected" &&
        task.completed === false
  );

  // Sorting function to display task from earliest expiry first to latest expiry
  pendingPartnerAcceptData.sort(function (a, b) {
    return a.completion < b.completion
      ? -1
      : a.completion > b.completion
      ? 1
      : 0;
  });

  pendingPartnerRejectData.sort(function (a, b) {
    return a.completion < b.completion
      ? -1
      : a.completion > b.completion
      ? 1
      : 0;
  });


  return (
    <>
      <h2>Pending Partner Acceptance</h2>
      {pendingPartnerAcceptData.length > 0 ? (
        <Container sx={{ py: 2 }} maxWidth="xl">
          <Grid container spacing={3} gap={6}>
            <TaskCardComponent tasks={pendingPartnerAcceptData} />
          </Grid>
        </Container>
      ) : (
        <Typography variant="h3">No Request For Partner Acceptance</Typography>
      )}
      <br />
      <hr />
      <h2>Partner Rejected</h2>
      {pendingPartnerRejectData.length > 0 ? (
        <Container sx={{ py: 2 }} maxWidth="xl">
          <Grid container spacing={3} gap={6}>
            <TaskCardComponent tasks={pendingPartnerRejectData} />
          </Grid>
        </Container>
      ) : (
        <Typography variant="h3">
          No Request Currently Rejected By Partner
        </Typography>
      )}

      <br />
    </>
  );
}
