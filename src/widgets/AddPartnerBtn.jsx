import { Button, CardActions } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function AddPartnerBtn({ text }) {  
  // Temporary CSS styles to override Typography color just for this button
  const styles = {
    "&.MuiButton-contained": {
      backgroundColor: "blue",
      color: "white",
    },
    "&.MuiButton-text": {
      color: "white",
    },
  };

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={styles}
      startIcon={<PersonAddIcon />}
    >
      {text}
    </Button>
  );
}