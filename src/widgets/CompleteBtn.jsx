import { Button, CardActions } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';

export default function CompleteBtn({ text }) {
  return (
    <Button type="submit" fullWidth variant="contained" 
    startIcon={<DoneIcon />} color="success">
     { text }     
    </Button>
  );
}
