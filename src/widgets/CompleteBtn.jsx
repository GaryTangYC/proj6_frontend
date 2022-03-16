import { Button, CardActions } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';

export default function CompleteBtn({ text, onclick }) {
    const CompleteFn = (e) => {
    e.preventDefault()
    console.log('button clicked')
  }

  return (
    <Button type="submit" fullWidth variant="contained" 
    startIcon={<DoneIcon />} color="success" onClick={CompleteFn}>
     { text }     
    </Button>
  );
}
