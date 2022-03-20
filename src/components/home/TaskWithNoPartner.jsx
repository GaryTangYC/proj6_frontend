/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../store";
/* mui imports */
import { Typography } from "@mui/material";
/* widget/component imports */
import TaskCardComponent from "./TaskCardComponent";
import { Grid, Container } from "@mui/material";
import {
  parseISO,
  isBefore,
  isSameDay,
  differenceInSeconds,
} from "date-fns";

export default function TaskWithPartner() {
  const { store } = useContext(Context);
  const { tasks } = store;

  // const [filteredTasks, setFilteredTasks1] = useState(
  //   tasks.filter((task) => task.partner === null && task.completed === false)
  // );

  // Test Date Filtering on expired task
  // Store data in a const
  const storeData = [...tasks];
  let noPartnerData = storeData.filter(
    (task) => task.partner === null && task.completed === false
  );

  let noPartnerExpiredData = [];
  let testSameDateData = [];

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
      new Date());

      console.log('istaskTimeexpired', isTaskTimeExpired)

    if ( isTaskTimeExpired < 0) {
    noPartnerExpiredData.push(noPartnerData[i]);
    noPartnerData.splice(i, 1);
    }

  }
  

  //Load separate array data into the required field
  console.log('tasks that has not expired', noPartnerData)
  console.log('tasks that has expired', noPartnerExpiredData)

  return (
    <>
      <h2>Ongoing Tasks</h2>
      {noPartnerData.length > 0 ? (
        <Container sx={{ py: 2 }} maxWidth="xl">
          <Grid container spacing={3} gap={6}>
            <TaskCardComponent tasks={noPartnerData} />
          </Grid>
        </Container>
      ) : (
        <Typography variant="h3">No Ongoing Task</Typography>
      )}
      <br />
      <hr />
      <h2>Expired Tasks</h2>
      {noPartnerExpiredData.length > 0 ? (
        <Container sx={{ py: 2 }} maxWidth="xl">
          <Grid container spacing={3} gap={6}>
            <TaskCardComponent tasks={noPartnerExpiredData} />
          </Grid>
        </Container>
      ) : (
        <Typography variant="h3">No Expired Task </Typography>
      )}
    </>
  );
}
