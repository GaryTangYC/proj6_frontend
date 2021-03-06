/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../../store";
/* mui imports */
import { Box, Grid, Container, Typography } from "@mui/material";
/* widget/component imports */
import PendingTaskCardComponent from "./PendingTaskCardComponent";
import ExpiredTaskCardComponent from "./ExpiredTaskCardComponent";

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
      <Box m={3}>
        <Box my={3}>
          <h2>Pending Partner Acceptance</h2>
        </Box>
        {pendingPartnerAcceptData.length > 0 ? (
          <Box m={3}>
            <Grid container spacing={3} gap={6}>
              <PendingTaskCardComponent tasks={pendingPartnerAcceptData} />
            </Grid>
          </Box>
        ) : (
          <Typography variant="h3">
            No Request For Partner Acceptance
          </Typography>
        )}
        <br />
      </Box>
      <hr />
      <Box m={3}>
        <Box my={3}>
          <h2>Partner Rejected</h2>
        </Box>
        {pendingPartnerRejectData.length > 0 ? (
          <Box m={3}>
            <Grid container spacing={3} gap={6}>
              <ExpiredTaskCardComponent tasks={pendingPartnerRejectData} />
            </Grid>
          </Box>
        ) : (
          <Typography variant="h3">
            No Request Currently Rejected By Partner
          </Typography>
        )}
        <br />
      </Box>
    </>
  );
}
