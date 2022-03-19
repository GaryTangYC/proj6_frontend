/* react imports */
import { useContext, useState } from "react";
import { Context } from "../../store";
/* mui imports */
import { Typography}  from "@mui/material";
/* widget/component imports */
import TaskCardComponent from "./TaskCardComponent";
import { Grid, Container } from "@mui/material";

export default function TaskWithPartner() {
  const { store } = useContext(Context);
  const { tasks } = store;

  const [filteredTasks, setFilteredTasks1] = useState(
    tasks.filter((task) => task.partner === null && task.completed === false)
  );

  const disabled="disabled"

  console.log('this is filter task with no partner',filteredTasks)
  return (
    <>       
      <h2>Ongoing Tasks</h2>
      {filteredTasks.length>0 ? (
      <Container sx={{ py: 2 }} maxWidth="xl" >
      <Grid container spacing={3} gap={6} >
      <TaskCardComponent tasks={filteredTasks} />
      </Grid>
      </Container>
      ): (<Typography variant="h3">No Ongoing Task</Typography>)}
      <br />
    </>
  );
}
