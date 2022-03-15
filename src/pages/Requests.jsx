/* react imports */
import { useState } from "react";
/* mui imports */
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import ActiveRequests from "../components/requests/ActiveRequests";
import PendingRequests from "../components/requests/PendingRequests";

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

export default function RequestPage() {
  function BasicTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (evt, newValue) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <MyTabs value={value} onChange={handleChange}>
            <MyTab label="Active Requests" />
            <MyTab label="Pending Requests" />
          </MyTabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ActiveRequests />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PendingRequests />
        </TabPanel>
      </Box>
    );
  }

  return (
    <DashboardContent>
      <BasicTabs />
    </DashboardContent>
  );
}

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';

// const AntTabs = styled(Tabs)({
//   borderBottom: '1px solid #e8e8e8',
//   '& .MuiTabs-indicator': {
//     backgroundColor: '#1890ff',
//   },
// });

// const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
//   textTransform: 'none',
//   minWidth: 0,
//   [theme.breakpoints.up('sm')]: {
//     minWidth: 0,
//   },
//   fontWeight: theme.typography.fontWeightRegular,
//   marginRight: theme.spacing(1),
//   color: 'rgba(0, 0, 0, 0.85)',
//   fontFamily: [
//     '-apple-system',
//     'BlinkMacSystemFont',
//     '"Segoe UI"',
//     'Roboto',
//     '"Helvetica Neue"',
//     'Arial',
//     'sans-serif',
//     '"Apple Color Emoji"',
//     '"Segoe UI Emoji"',
//     '"Segoe UI Symbol"',
//   ].join(','),
//   '&:hover': {
//     color: '#40a9ff',
//     opacity: 1,
//   },
//   '&.Mui-selected': {
//     color: '#1890ff',
//     fontWeight: theme.typography.fontWeightMedium,
//   },
//   '&.Mui-focusVisible': {
//     backgroundColor: '#d1eaff',
//   },
// }));

// const StyledTabs = styled((props) => (
//   <Tabs
//     {...props}
//     TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
//   />
// ))({
//   '& .MuiTabs-indicator': {
//     display: 'flex',
//     justifyContent: 'center',
//     backgroundColor: 'transparent',
//   },
//   '& .MuiTabs-indicatorSpan': {
//     maxWidth: 40,
//     width: '100%',
//     backgroundColor: '#635ee7',
//   },
// });

// const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
//   ({ theme }) => ({
//     textTransform: 'none',
//     fontWeight: theme.typography.fontWeightRegular,
//     fontSize: theme.typography.pxToRem(15),
//     marginRight: theme.spacing(1),
//     color: 'rgba(255, 255, 255, 0.7)',
//     '&.Mui-selected': {
//       color: '#fff',
//     },
//     '&.Mui-focusVisible': {
//       backgroundColor: 'rgba(100, 95, 228, 0.32)',
//     },
//   }),
// );

// export default function CustomizedTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ bgcolor: '#fff' }}>
//         <AntTabs value={value} onChange={handleChange} aria-label="ant example">
//           <AntTab label="Tab 1" />
//           <AntTab label="Tab 2" />
//           <AntTab label="Tab 3" />
//         </AntTabs>
//         <Box sx={{ p: 3 }} />
//       </Box>
//       <Box sx={{ bgcolor: '#2e1534' }}>
//         <StyledTabs
//           value={value}
//           onChange={handleChange}
//           aria-label="styled tabs example"
//         >
//           <StyledTab label="Workflows" />
//           <StyledTab label="Datasets" />
//           <StyledTab label="Connections" />
//         </StyledTabs>
//         <Box sx={{ p: 3 }} />
//       </Box>
//     </Box>
//   );
// }

// import * as React from 'react';
// import { styled, createTheme, ThemeProvider } from '@mui/system';

// const customTheme = createTheme({
//   components: {
//     MyThemeComponent: {
//       styleOverrides: {
//         root: {
//           color: 'darkslategray',
//         },
//         primary: {
//           color: 'darkblue',
//         },
//         secondary: {
//           color: 'darkred',
//           backgroundColor: 'pink',
//         },
//       },
//       variants: [
//         {
//           props: { variant: 'dashed', color: 'primary' },
//           style: {
//             border: '1px dashed darkblue',
//           },
//         },
//         {
//           props: { variant: 'dashed', color: 'secondary' },
//           style: {
//             border: '1px dashed darkred',
//           },
//         },
//       ],
//     },
//   },
// });

// const MyThemeComponent = styled('div', {
//   // Configure which props should be forwarded on DOM
//   shouldForwardProp: (prop) =>
//     prop !== 'color' && prop !== 'variant' && prop !== 'sx',
//   name: 'MyThemeComponent',
//   slot: 'Root',
//   // We are specifying here how the styleOverrides are being applied based on props
//   overridesResolver: (props, styles) => [
//     styles.root,
//     props.color === 'primary' && styles.primary,
//     props.color === 'secondary' && styles.secondary,
//   ],
// })(({ theme }) => ({
//   backgroundColor: 'aliceblue',
//   padding: theme.spacing(1),
// }));

// export default function UsingOptions() {
//   return (
//     <ThemeProvider theme={customTheme}>
//       <MyThemeComponent sx={{ m: 1 }} color="primary" variant="dashed">
//         Primary
//       </MyThemeComponent>
//       <MyThemeComponent sx={{ m: 1 }} color="secondary">
//         Secondary
//       </MyThemeComponent>
//     </ThemeProvider>
//   );
// }

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </Box>
//       <TabPanel value={value} index={0}>
//         Item One
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel>
//     </Box>
//   );
// }
