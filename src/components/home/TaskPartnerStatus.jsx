/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../store";
/* mui imports */
import { Grid, Container, Typography}  from "@mui/material";
/* widget/component imports */
import TaskCardComponent from "./TaskCardComponent";

export default function TaskPartnerStatus() {
  const { store } = useContext(Context);
  const { tasks } = store;

  /**
   * Filters for pending partner acceptance to be the accountable partner
   */
  const [filteredTasks1, setFilteredTasks1] = useState(
    tasks.filter((task) => task.partner !== null && task.partnerAccepted === "pending" && task.completed === false)
  );

    /**
   * Filters for pending partner acceptance to be the accountable partner
   */
  const [filteredTasks2, setFilteredTasks2] = useState(
    tasks.filter((task) => task.partner !== null && task.partnerAccepted === 'rejected' && task.completed === false)
  );


  console.log('this is filter task with no partner',filteredTasks1)
  return (
    <>
      <h2>Pending Partner Acceptance</h2>
      {filteredTasks1.length>0 ? (
      <Container sx={{ py: 2 }} maxWidth="xl">
          <Grid container spacing={3} gap={6}>
      <TaskCardComponent tasks={filteredTasks1} />
       </Grid>
        </Container>
      ): (<Typography variant="h3">No Request For Partner Acceptance</Typography>)}
      <br />
     <hr />
     <h2>Partner Rejected</h2>
     {filteredTasks2.length>0 ? (
             <Container sx={{ py: 2 }} maxWidth="xl">
          <Grid container spacing={3} gap={6}>
     <TaskCardComponent tasks={filteredTasks2} />
      </Grid>
        </Container>
     ): (<Typography variant="h3">No Request Currently Rejected By Partner</Typography>)}
     
      <br />
    </>
  );
}
