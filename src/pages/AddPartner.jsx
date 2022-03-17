/* react imports */
import { useContext } from "react";
import { Context } from "./../store";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
/* mui imports */
import {
  Box,
  Container,
  IconButton,
  Link,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemText,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
/* other imports */
import { districts } from "../utils/districts";
import axios from "axios";

export default function AddPartnerPage() {
  /* get data from store */
  const { store } = useContext(Context);
  const { otherUsers, token } = store;
  /* get taskId from url */
  const { taskId } = useParams();
  /* bckend urls + auth */
  const baseBckendUrl = process.env.REACT_APP_BCKEND_BASE_URI;
  const baseImageUrl = process.env.REACT_APP_IMAGE_BASE_URI;
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  /* to navigate bck to Home page after choosing partner */
  const navigate = useNavigate();
  /* replace postal code number w district name*/
  const modifiedUsers = otherUsers.map((el) => {
    return { ...el, postal: districts[el.postal] };
  });

  /* 
  1. add taskId to requests field for chosen user 
  2. add partnerId to task partner field + pending to partnerAccepted field
  3. send back to Home page after updates, not sure if useEffect will run...
  */
  const requestPartner = async (evt, userId) => {
    evt.preventDefault();
    updateUser(userId);
    updateTask(userId);
    goHome();
  };

  const updateUser = async (userId) => {
    await axios.put(
      `${baseBckendUrl}/user/addRequest`,
      { userId, taskId },
      auth
    );
  };

  const updateTask = async (userId) => {
    await axios.put(
      `${baseBckendUrl}/task/partnerRequest`,
      { taskId, userId },
      auth
    );
  };

  const goHome = () => {
    navigate("/home");
  };
  return (
    <DashboardContent>
      <Link underline="none" component={RouterLink} to="/home">
        <IconButton>
          <CancelIcon />
        </IconButton>
      </Link>
      <Container component="main">
        <Box>
          <Typography variant="h2">
            Choose an accountability partner for this task
          </Typography>
          <List>
            {modifiedUsers.map((othUser) => {
              return (
                <ListItem
                  alignItems="flex-start"
                  key={othUser._id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={(evt) => {
                        requestPartner(evt, othUser._id);
                      }}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                  }
                >
                  <Avatar src={`${baseImageUrl}${othUser.pic}`} />
                  <ListItemText>
                    <Typography variant="h5">{othUser.name}</Typography>
                    <Typography variant="h4">{othUser.bio}</Typography>
                    <Typography variant="h4">
                      District: {othUser.postal}
                    </Typography>
                  </ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Container>
    </DashboardContent>
  );
}

// import * as React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';

// export default function AlignItemsList() {
//   return (
//     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Brunch this weekend?"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 Ali Connors
//               </Typography>
//               {" — I'll be in your neighborhood doing errands this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Summer BBQ"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 to Scott, Alex, Jennifer
//               </Typography>
//               {" — Wish I could come, but I'm out of town this…"}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//         </ListItemAvatar>
//         <ListItemText
//           primary="Oui Oui"
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//                 Sandra Adams
//               </Typography>
//               {' — Do you have Paris recommendations? Have you ever…'}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//     </List>
//   );
// }

// import * as React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import CommentIcon from '@mui/icons-material/Comment';

// export default function CheckboxList() {
//   const [checked, setChecked] = React.useState([0]);

//   const handleToggle = (value) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     setChecked(newChecked);
//   };

//   return (
//     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//       {[0, 1, 2, 3].map((value) => {
//         const labelId = `checkbox-list-label-${value}`;

//         return (
//           <ListItem
//             key={value}
//             secondaryAction={
//               <IconButton edge="end" aria-label="comments">
//                 <CommentIcon />
//               </IconButton>
//             }
//             disablePadding
//           >
//             <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
//               <ListItemIcon>
//                 <Checkbox
//                   edge="start"
//                   checked={checked.indexOf(value) !== -1}
//                   tabIndex={-1}
//                   disableRipple
//                   inputProps={{ 'aria-labelledby': labelId }}
//                 />
//               </ListItemIcon>
//               <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
//             </ListItemButton>
//           </ListItem>
//         );
//       })}
//     </List>
//   );
// }
