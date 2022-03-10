/* mui imports */
import { Container, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SubmitBtn from "../widgets/SubmitBtn";

const LogInTest = () => {
  return (
    <Container>
      <PlayCircleOutlineIcon />
      <Typography variant="h1">this is a h1</Typography>
      <Typography variant="body1">this is some body 1 text</Typography>
      <br></br>
      <SubmitBtn />
    </Container>
  );
};

export default LogInTest;