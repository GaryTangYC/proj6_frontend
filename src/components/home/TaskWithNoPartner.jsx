/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../store";
/* mui imports */
import { Typography } from "@mui/material";
/* widget/component imports */
import TaskCardComponent from "./TaskCardComponent";
import { Grid, Container } from "@mui/material";
import {
  format,
  isValid,
  parse,
  parseISO,
  isPast,
  isBefore,
  isSameDay,
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
  console.log("storeData", storeData);
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
    console.log("task noPartnerData", noPartnerData[i].description);
    console.log(
      "🚀 ~ file: TaskWithNoPartner.jsx ~ line 32 ~ TaskWithPartner ~ convertDate ",
      convertDate
    );
    console.log(
      "🚀 ~ file: TaskWithNoPartner.jsx ~ line 35 ~ TaskWithPartner ~ isDateBefore ",
      isDateBefore
    );
    console.log(
      "🚀 ~ file: TaskWithNoPartner.jsx ~ line 36 ~ TaskWithPartner ~ isDateSameDay",
      isDateSameDay
    );

    if (isDateBefore === true && isDateSameDay === false) {
      noPartnerExpiredData.push(noPartnerData[i]);
      console.log("noPartnerExpiredData", noPartnerExpiredData);
      noPartnerData.splice(i, 1);
    }
    
    // For date that are same day, check on time completion to see if expired
    if (isDateSameDay === true) {
      testSameDateData.push(noPartnerData[i]);
    }

    // console.log("🚀 ~ file: TaskWithNoPartner.jsx ~ line 26 ~ TaskWithPartner ~ currentDateTime ", currentDateTime )
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
  // 1st for loop: Compare if task completion date isPast existing date; result is true .pop data from array to new array of expired

  //2nd if: Compare if task completion time is expired (need to check which format to use) as compared to existing time); result if true .pop data from storeData to new array

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

// // Extract year, month, day of completion to compare between current date
// const year = convertDate.toISOString().substring(0,4)
// console.log("🚀 ~ file: TaskWithNoPartner.jsx ~ line 31 ~ TaskWithPartner ~ year", year)
// const month = convertDate.toISOString().substring(5,7)
// console.log("🚀 ~ file: TaskWithNoPartner.jsx ~ line 32 ~ TaskWithPartner ~ month", month)
// const day = convertDate.toISOString().substring(8,10)
// console.log("🚀 ~ file: TaskWithNoPartner.jsx ~ line 35 ~ TaskWithPartner ~ day", day)
// const compareDate = isPast(new Date(year, month, day))
// console.log("🚀 ~ file: TaskWithNoPartner.jsx ~ line 40 ~ TaskWithPartner ~ compareDate", compareDate)
// const dummyCompare = isPast(new Date(convertDate))
// console.log("🚀 ~ file: TaskWithNoPartner.jsx ~ line 43 ~ TaskWithPartner ~ dummyCompare", dummyCompare)

// const convertDate2 = convertDate.toISOString().substring(0,10)
// console.log("🚀 ~ file: TaskWithNoPartner.jsx ~ line 36 ~ TaskWithPartner ~ convertDate2", convertDate2)
// const checkDate = isValid(convertDate)
// console.log('convertDate' ,convertDate)

// console.log('checkDate' ,checkDate)
// console.log('currentdatetime', currentDateTime)
