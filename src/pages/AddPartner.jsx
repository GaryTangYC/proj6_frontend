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
    // updateUser(userId);
    updateTask(userId);
    goHome();
  };

  /* this shld be redundant... */
  // const updateUser = async (userId) => {
  //   await axios.put(
  //     `${baseBckendUrl}/user/addRequest`,
  //     { userId, taskId },
  //     auth
  //   );
  // };

  const updateTask = async (userId) => {
    await axios.put(
      `${baseBckendUrl}/task/partnerRequest`,
      { taskId, userId, status:"pending" },
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

