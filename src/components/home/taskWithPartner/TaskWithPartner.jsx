/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../../store";
/* mui imports */
import { Box, Container, Grid, Typography } from "@mui/material";
/* widget/component imports */
import TaskCardComponent from "./TaskCardComponent";
import ExpiredTaskCardComponent from "./ExpiredTaskCardComponent";
import PendingTaskCardComponent from "./PendingTaskCardComponent";
/* other imports */
import { parseISO, differenceInSeconds } from "date-fns";
import "../styles.css";

export default function TaskWithPartner() {
  const { store } = useContext(Context);
  const { tasks } = store;

  // Store data in a const
  const storeData = [...tasks];

  // Pending ongoing tasks with partner
  let partnerData = storeData.filter(
    (task) =>
      task.partner !== null &&
      task.completed === false &&
      task.partnerAccepted === "true" &&
      task.endIndicated === false
  );

  let partnerExpiredData = [];

  // Run filtering using for loop and store expiry vs live data in separate array
  for (let i = partnerData.length - 1; i >= 0; i--) {
    // Parse string to ISO date format
    const convertDate = parseISO(
      partnerData[i].completion,
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
      new Date()
    );

    // Check if task completion time is past existing time. If yes, to insert into array partnerExpiredData
    const isTaskTimeExpired = differenceInSeconds(
      new Date(convertDate),
      new Date()
    );

    console.log("istaskTimeexpired", isTaskTimeExpired);

    if (isTaskTimeExpired < 0) {
      partnerExpiredData.push(partnerData[i]);
      partnerData.splice(i, 1);
    }
  }

  // Pending partner acknowledgement for completion tasks
  let partnerPendingCompletionData = storeData.filter(
    (task) =>
      task.partner !== null &&
      task.partner !== null &&
      task.completed === false &&
      task.partnerAccepted === "true" &&
      task.endIndicated === true
  );

  // Sorting function to display task from earliest expiry first to latest expiry
  partnerExpiredData.sort(function (a, b) {
    return a.completion < b.completion
      ? -1
      : a.completion > b.completion
      ? 1
      : 0;
  });

  partnerData.sort(function (a, b) {
    return a.completion < b.completion
      ? -1
      : a.completion > b.completion
      ? 1
      : 0;
  });

  partnerPendingCompletionData.sort(function (a, b) {
    return a.completion < b.completion
      ? -1
      : a.completion > b.completion
      ? 1
      : 0;
  });

  console.log("this is filter task with partner", partnerData);

  console.log(
    "this is filter task with partner - pending AP complete",
    partnerPendingCompletionData
  );

  console.log("this is filter expired task with partner", partnerExpiredData);

  return (
    <>
      <Box m={3}>
        <div className="subHeader">
          <h2>Ongoing Tasks</h2>
        </div>
        {partnerData.length > 0 ? (
          <Container sx={{ py: 2 }} maxWidth="xl">
            <Grid container spacing={3} gap={6}>
              <TaskCardComponent tasks={partnerData} />
            </Grid>
          </Container>
        ) : (
          <Typography variant="h3">No Ongoing Task</Typography>
        )}
        <br />
      </Box>
      <hr />
      <Box m={3}>
        <h2>Pending Acknowledgement For Completion</h2>
        {partnerPendingCompletionData.length > 0 ? (
          <Container sx={{ py: 2 }} maxWidth="xl">
            <Grid container spacing={3} gap={6}>
              <PendingTaskCardComponent tasks={partnerPendingCompletionData} />
            </Grid>
          </Container>
        ) : (
          <Typography variant="h3">No Pending Task </Typography>
        )}
      </Box>

      <hr />
      <Box m={3}>
        <h2>Expired Tasks</h2>
        {partnerExpiredData.length > 0 ? (
          <Container sx={{ py: 2 }} maxWidth="xl">
            <Grid container spacing={3} gap={6}>
              <ExpiredTaskCardComponent tasks={partnerExpiredData} />
            </Grid>
          </Container>
        ) : (
          <Typography variant="h3">No Pending Task </Typography>
        )}
      </Box>
    </>
  );
}
