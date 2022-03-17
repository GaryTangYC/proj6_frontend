import axios from "axios";
/* react imports */
import { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import { Context, populateHome } from "./../store";
import { useParams } from "react-router-dom";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import TaskCardComponent from "../components/home/TaskCardComponent";

// Test date
// import { parseJSON } from "date-fns"
//       const date = parseJSON('2022-03-24T10:24:03.000+00:00')

export default function HomePage() {
  const { store, dispatch } = useContext(Context);
  const { user, token, tasks } = store;
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const { userId } = useParams();
  let validId
  if(!userId){
    validId=user._id
  } else{
    validId=userId
  }

  const baseBckendUrl = process.env.REACT_APP_BCKEND_BASE_URI;

  useEffect(() => {
    (async () => {

      const userDetails = await axios.get(
        `${baseBckendUrl}/user/getUser/${validId}`,
        auth
      );
      const userTasks = await axios.get(
        `${baseBckendUrl}/task/getAllTask/${validId}`,
        auth
      );
      const partnerTasks = await axios.get(
        `${baseBckendUrl}/task/PartnerTasks/${validId}`,
        auth
      );
      const allOtherUsers = await axios.get(
        `${baseBckendUrl}/user/getAllUsers/${validId}`,
        auth
      );
      dispatch(
        populateHome(
          userDetails.data,
          userTasks.data,
          partnerTasks.data,
          allOtherUsers.data
        )
      );

    })();
  }, []);

   console.log("This is store in home.jsx", store);

  return (
    <DashboardContent>
      <h2>Outstanding Tasks</h2>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          {`This is token after signing in ${token}`}
          <TaskCardComponent tasks={tasks} />
        </Grid>
      </Grid>
      <hr></hr>
      <h2>Pending Accountability Tasks</h2>
    </DashboardContent>
  );
}
