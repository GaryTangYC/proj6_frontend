import { Button } from "@mui/material";

export default function TaskCardBtn({ text, color, icon, value, onClick, disabled}) {
  
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      startIcon={icon}
      color={color}
      value={value}
      onClick={onClick}
      disabled={disabled}     
      >
      {text}
    </Button>
  );
}
