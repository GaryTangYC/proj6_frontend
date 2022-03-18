import axios from "axios";
/* react imports */
import { useContext, useEffect, useState } from "react";
import { Grid, Tabs, Tab, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Context, populateHome } from "./../store";
import { useParams } from "react-router-dom";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import TaskWithPartner from "../components/home/TaskWithPartner";
import TaskWithNoPartner from "../components/home/TaskWithNoPartner";
import TaskTest from "../components/home/TaskTest";

// Test date
// import { parseJSON } from "date-fns"
//       const date = parseJSON('2022-03-24T10:24:03.000+00:00')

/* change default Tabs css */
const MyTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

/* change default Tab css */
const MyTab = styled(Tab)(({ theme }) => ({
  "&.Mui-selected": {
    color: theme.palette.secondary.main,
  },
  "&.MuiTab-root": {
    fontSize: "16px",
    fontWeight: "600",
  },
}));

/* this holds the actual contents seen in ea tabbed page  */
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function HomePage() {
  const { store, dispatch } = useContext(Context);
  const { user, token, tasks } = store;
  const [taskFiltering, setTaskFiltering] = useState([]);
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const { userId } = useParams();
  let validId;
  if (!userId) {
    validId = user._id;
  } else {
    validId = userId;
  }

  const baseBckendUrl = process.env.REACT_APP_BCKEND_BASE_URI;

  /**************
   * Post login to fetch tasks from backend and store in global context
   ****************/

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

      // filter and store different taskdata in home state for rendering
      let taskStorage = [...tasks];
      console.log("taskStorage", taskStorage);
      let filteredTask = taskStorage.filter(
        (task) => task.partner == null && task.completed === false
      );
      setTaskFiltering(filteredTask);

    })();
  }, []);

  console.log("This is store in home.jsx", store);
    console.log("This is taskFiltering", taskFiltering);

  /**************
   * Function to change tabs
   ****************/

  function BasicTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (evt, newValue) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <MyTabs value={value} onChange={handleChange}>
            <MyTab label="Tasks - No Partner" />
            <MyTab label="Tasks - Partner" />
            {/* <MyTab label="Pending Requests" /> */}
          </MyTabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TaskTest taskfiltering={taskFiltering} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <TaskWithPartner /> */}
        </TabPanel>
      </Box>
    );
  }

  /**************
   * Render Return Components
   ****************/

  return (
    <DashboardContent>
      {`This is token after signing in ${token}`}
      <Grid item xs={12} sm={6} md={3}>
        <BasicTabs />
      </Grid>
    </DashboardContent>
  );
}
