/* react imports */
import { useState } from "react";
/* mui imports */
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import ActiveRequests from "../components/requests/ActiveRequests";
import PendingRequests from "../components/requests/PendingRequests";
/* other imports */
import "./Requests.css";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function RequestPage() {
  function BasicTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (evt, newValue) => {
      setValue(newValue);
    };

    return (
      <div id="overall">
        <div id="top">
          <MyTabs value={value} onChange={handleChange}>
            <MyTab label="Active Requests" />
            <MyTab label="Pending Requests" />
          </MyTabs>
        </div>
        <div id="list_area">
          <TabPanel value={value} index={0}>
            <ActiveRequests />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PendingRequests />
          </TabPanel>
        </div>
      </div>
    );
  }

  return (
    <DashboardContent>
      <BasicTabs />
    </DashboardContent>
  );
}

{
  /* <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
     </Box> */
}
