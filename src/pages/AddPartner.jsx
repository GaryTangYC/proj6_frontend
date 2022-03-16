/* react imports */
import { useRef } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
/* mui imports */
import { Box, Container, IconButton, TextField, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import SubmitBtn from "../widgets/SubmitBtn";
/* other imports */
import axios from "axios";

/* change default Box css */
const MyBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: theme.palette.background.default,
  border: "2px solid #ececec",
  boxShadow: 24,
}));

export default function AddPartnerPage() {
  const userNameInput = useRef();
  const {taskId} = useParams()
  console.log("This is taskId in add task page",taskId)
  const doSubmit = (evt) => {
    evt.preventDefault();
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
          <h3>Provide user name</h3>
          <form noValidate autoComplete="off" onSubmit={doSubmit}>
            <TextField
              required
              inputRef={userNameInput}
              color="secondary"
              placeholder="any user name you like, <>=@{}; characters not allowed"
              variant="outlined"
            />
            <br></br>
            <SubmitBtn text="Request partner" />
          </form>
        </Box>
      </Container>
    </DashboardContent>
  );
}

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import Stack from '@mui/material/Stack';

// const Input = styled('input')({
//   display: 'none',
// });

// export default function UploadButtons() {
//   return (
//     <Stack direction="row" alignItems="center" spacing={2}>
//       <label htmlFor="contained-button-file">
//         <Input accept="image/*" id="contained-button-file" multiple type="file" />
//         <Button variant="contained" component="span">
//           Upload
//         </Button>
//       </label>
//       <label htmlFor="icon-button-file">
//         <Input accept="image/*" id="icon-button-file" type="file" />
//         <IconButton color="primary" aria-label="upload picture" component="span">
//           <PhotoCamera />
//         </IconButton>
//       </label>
//     </Stack>
//   );
// }
