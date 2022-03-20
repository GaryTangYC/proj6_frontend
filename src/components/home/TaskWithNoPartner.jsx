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

  const [filteredTasks, setFilteredTasks1] = useState(
    tasks.filter((task) => task.partner === null && task.completed === false)
  );

  // Test Date Filtering on expired task
  // Store data in a const
  const storeData = [...tasks];
  let noPartnerData = storeData.filter(
    (task) => task.partner === null && task.completed === false
  );

  console.log("noPartnerData stored data", noPartnerData);
  let currentDateTime = new Date();
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

    // Check if task completion date is past existing date and if date is same day to be moved to expired
    const isDateBefore = isBefore(new Date(convertDate), new Date());
    const isDateSameDay = isSameDay(new Date(convertDate), new Date());
    const isTaskTimeExpired = differenceInSeconds(
      new Date(convertDate),
      new Date());
    // console.log("task noPartnerData", noPartnerData[i].description);
    // console.log(
    //   "🚀 ~ file: TaskWithNoPartner.jsx ~ line 32 ~ TaskWithPartner ~ convertDate ",
    //   convertDate
    // );
    // console.log(
    //   "🚀 ~ file: TaskWithNoPartner.jsx ~ line 35 ~ TaskWithPartner ~ isDateBefore ",
    //   isDateBefore
    // );
    // console.log(
    //   "🚀 ~ file: TaskWithNoPartner.jsx ~ line 36 ~ TaskWithPartner ~ isDateSameDay",
    //   isDateSameDay
    // );
      console.log('istaskTimeexpired', isTaskTimeExpired)
    

    // if (isDateBefore === true && isDateSameDay === false) {
    //   noPartnerExpiredData.push(noPartnerData[i]);
    //   console.log("noPartnerExpiredData", noPartnerExpiredData);
    //   noPartnerData.splice(i, 1);
    // }

    if ( isTaskTimeExpired < 0) {
    noPartnerExpiredData.push(noPartnerData[i]);
    noPartnerData.splice(i, 1);
    }

  }
  console.log("noPartnerExpiredData", noPartnerExpiredData);
  console.log(
    "🚀 ~ file: TaskWithNoPartner.jsx ~ line 38 ~ TaskWithPartner ~ NonExpiredData",
    noPartnerData
  );
  console.log(
    "🚀 ~ file: TaskWithNoPartner.jsx ~ line 44 ~ TaskWithPartner ~ testSameDateData",
    testSameDateData
  );


  //Load separate array data into the required field
  console.log("this is filter task with no partner", filteredTasks);

  return (
    <>
      <h2>Ongoing Tasks</h2>
      {filteredTasks.length > 0 ? (
        <Container sx={{ py: 2 }} maxWidth="xl">
          <Grid container spacing={3} gap={6}>
            <TaskCardComponent tasks={filteredTasks} />
          </Grid>
        </Container>
      ) : (
        <Typography variant="h3">No Ongoing Task</Typography>
      )}
      <br />
    </>
  );
}
