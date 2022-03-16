import axios from "axios";
/* react imports */
import { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import { Context, getOwnTasks, getPartnerTasks } from "./../store";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import TaskCardComponent from "../components/home/TaskCardComponent";

// Test date
// import { parseJSON } from "date-fns"
//       const date = parseJSON('2022-03-24T10:24:03.000+00:00')

export default function HomePage() {
  const { store, dispatch } = useContext(Context);
  const { user, token, tasks } = store;

  const getOwnTasksbckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/getAllTask/${user.id}`;
  const getPartnerTasksBckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/PartnerTasks/${user.id}`;

  useEffect(() => {
    (async () => {
      const result = await axios.get(getOwnTasksbckendUrl);
      dispatch(getOwnTasks(result.data));
      const partnerTasks = await axios.get(getPartnerTasksBckendUrl);
      dispatch(getPartnerTasks(partnerTasks.data));
    })();
  }, []);

  console.log("This is store in home.jsx", store);

  return (
    <DashboardContent>
      <h2>Outstanding Tasks</h2>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          {`This is user name after signing in ${user.name}`}
          <br></br>
          {`This is user bio after signing in ${user.bio}`}
          <br></br>
          {`This is user id after signing in ${user.id}`}
          <br></br>
          {`This is token after signing in ${token}`}
          <TaskCardComponent tasks={tasks} />
        </Grid>
      </Grid>
      <hr></hr>
      <h2>Pending Accountability Tasks</h2>
    </DashboardContent>
  );
}
