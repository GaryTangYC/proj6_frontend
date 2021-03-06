/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../../store";
/* mui imports */
import { Box, Container, Grid, Typography } from "@mui/material";
/* widget/component imports */
import TaskCardComponent from "./TaskCardComponent";
/* other imports */
import { parseISO, differenceInSeconds } from "date-fns";
import "../styles.css";

export default function TaskWithNoPartner() {
  const { store } = useContext(Context);
  const { tasks } = store;

  // Store data in a const
  const storeData = [...tasks];
  let noPartnerData = storeData.filter(
    (task) => task.partner === null && task.completed === false
  );

  let noPartnerExpiredData = [];

  // Run filtering using for loop and store expiry vs live data in separate array
  for (let i = noPartnerData.length - 1; i >= 0; i--) {
    // Parse string to ISO date format
    const convertDate = parseISO(
      noPartnerData[i].completion,
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
      new Date()
    );

    // Check if task completion time is past existing time. If yes, to insert into array noPartnerExpiredData
    const isTaskTimeExpired = differenceInSeconds(
      new Date(convertDate),
      new Date()
    );

    console.log("istaskTimeexpired", isTaskTimeExpired);

    if (isTaskTimeExpired < 0) {
      noPartnerExpiredData.push(noPartnerData[i]);
      noPartnerData.splice(i, 1);
    }
  }

  // Sorting function to display task from earliest expiry first to latest expiry
  noPartnerExpiredData.sort(function (a, b) {
    return a.completion < b.completion
      ? -1
      : a.completion > b.completion
      ? 1
      : 0;
  });

  noPartnerData.sort(function (a, b) {
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
          <h2>Ongoing Tasks</h2>
        </Box>

        {noPartnerData.length > 0 ? (
          <Box m={3}>
            <Grid container spacing={3} gap={6}>
              <TaskCardComponent tasks={noPartnerData} />
            </Grid>
          </Box>
        ) : (
          <Typography variant="h3">No Ongoing Task</Typography>
        )}
      </Box>
      <br />
      <hr />
      <Box m={3}>
        <Box my={3}>
          <h2>Expired Tasks</h2>
        </Box>
        {noPartnerExpiredData.length > 0 ? (
          <Box m={3}>
            <Grid container spacing={3} gap={6}>
              <TaskCardComponent tasks={noPartnerExpiredData} />
            </Grid>
          </Box>
        ) : (
          <Typography variant="h3">No Expired Task </Typography>
        )}
      </Box>
    </>
  );
}
