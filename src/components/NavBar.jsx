import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from "@mui/material/Link";

export const mainListItems = (
  <>
    <Link href="/home">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>

    <Link href="/addtask">
      <ListItemButton>
        <ListItemIcon>
          <AddBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Add Tasks" />
      </ListItemButton>
    </Link>

    <Link href="/requests">
      <ListItemButton>
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        <ListItemText primary="Requests" />
      </ListItemButton>
    </Link>

    <Link href="/chats">
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
    <ListSubheader component="div" inset>
      Settings
    </ListSubheader>

    <Link href="/profile">
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </Link>

  </>
);
