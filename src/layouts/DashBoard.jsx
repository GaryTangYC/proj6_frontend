/* react imports */
import { useState, useContext } from "react";
import { Context, userLogOut } from "./../store";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
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
  const { store, dispatch } = useContext(Context);
  const { user } = store;
  const navigate = useNavigate();
  const imageUrl = `${process.env.REACT_APP_IMAGE_BASE_URI}${user.pic}`;

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const rawPath = location.pathname.substring(1);
  let title;
  if (rawPath.indexOf("/") > 0) {
    title = rawPath.substring(0, rawPath.indexOf("/"));
  } else {
    title = rawPath;
  }
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const doLogOut = () => {
    dispatch(userLogOut());
    navigate("/");
  };
  const MyAppBar = () => {
    const [menuAnchor, setMenuAnchor] = useState(null);
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
          <IconButton
            color="secondary"
            onClick={(evt) => {
              setMenuAnchor(evt.currentTarget);
            }}
          >
            {user.pic ? (
              <Avatar alt={user.name} src={imageUrl} />
            ) : (
              <AccountCircleIcon fontSize="large" />
            )}
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClick={() => {
              setMenuAnchor(null);
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <ListItemButton>
                <ListItemText>
                  <Typography variant="h5">{user.name}</Typography>
                </ListItemText>
              </ListItemButton>
            </MenuItem>
            <MenuItem>
              <Link component={RouterLink} to="/profile">
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="h5">Profile</Typography>
                  </ListItemText>
                </ListItemButton>
              </Link>
            </MenuItem>
            <MenuItem>
              <ListItemButton onClick={doLogOut}>
                <ListItemIcon>
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h5">Log Out</Typography>
                </ListItemText>
              </ListItemButton>
            </MenuItem>
          </Menu>
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
          <ListItemButton onClick={doLogOut}>
            <ListItemIcon>
              <PowerSettingsNewIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
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
