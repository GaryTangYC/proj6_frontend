import { Button, CardActions } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export default function ChatBtn({ text }) {

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      startIcon={<ChatIcon />}
    >
      {text}
    </Button>
  );
}
