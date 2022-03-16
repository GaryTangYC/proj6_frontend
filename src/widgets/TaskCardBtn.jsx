import { Button } from "@mui/material";

export default function TaskCardBtn({ text, color, icon }) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      startIcon={icon}
      color={color}
    >
      {text}
    </Button>
  );
}
