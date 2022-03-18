import { Button } from "@mui/material";

export default function TaskCardBtn({ text, color, icon, value, onClick}) {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      startIcon={icon}
      color={color}
      value={value}
      onClick={onClick}          
      >
      {text}
    </Button>
  );
}
