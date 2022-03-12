/* react imports */
import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
/* mui imports */
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
  Toolbar,
  List,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
/* widget/component imports */
import { mainListItems, secondaryListItems } from "../components/NavBar";

const drawerWidth = 180;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth + 8}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));


export default function DashboardContent({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation()
  const title = location.pathname.substring(1)
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const MyAppBar = () => {
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar>
        <IconButton
          edge="start"
          color="secondary"
          onClick={toggleDrawer}
          sx={{
            marginRight: "28px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="secondary"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title}
        </Typography>
        <Link component={RouterLink} to="/profile">
          <IconButton color="secondary">
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

const MyDrawer = () => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon color="secondary" />
        </IconButton>
      </Toolbar>

      <List component="nav">
        {mainListItems}
        {secondaryListItems}
      </List>
    </Drawer>
  );
};

  return (
    <Box sx={{ display: "flex" }}>
      <MyAppBar />
      <MyDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

/* 
- second <Box> within return statement above holds contents of each page component -> passed in through {children}
- single <Toolbar> within the second <Box> is workaround to ensure tt page component contents not covered by <MyAppBar> 
*/