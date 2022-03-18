import { Button } from "@mui/material";

export default function TaskCardBtn({ text, color, icon, value, onClick, disabled}) {
  let checkDisabled = null
    if (!disabled) {
      checkDisabled = "disabled"
    }

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      startIcon={icon}
      color={color}
      value={value}
      onClick={onClick}
      {...checkDisabled}      
      >
      {text}
    </Button>
  );
}
