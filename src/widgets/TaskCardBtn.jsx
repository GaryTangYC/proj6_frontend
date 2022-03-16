import { Button } from "@mui/material";

export default function TaskCardBtn({ text, color, icon, click }) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      startIcon={icon}
      color={color}
      onClick={click}
    >
      {text}
    </Button>
  );
}
