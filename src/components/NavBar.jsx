/* react imports */
import { Link as RouterLink } from "react-router-dom";
/* mui imports */
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const mainListItems = (
  <>
    <Link underline="none" component={RouterLink} to="/home">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>

    <Link underline="none" component={RouterLink} to="/addtask">
      <ListItemButton>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Add Tasks" />
      </ListItemButton>
    </Link>

    <Link underline="none" component={RouterLink} to="/requests">
      <ListItemButton>
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <ListItemText primary="Requests" />
      </ListItemButton>
    </Link>

    <Link underline="none" component={RouterLink} to="/chats">
      <ListItemButton>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Chat" />
      </ListItemButton>
    </Link>
  </>
);

export const secondaryListItems = (
  <>
    <Link underline="none" component={RouterLink} to="/profile">
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </Link>
  </>
);
