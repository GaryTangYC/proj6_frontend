import { TextField } from "@mui/material";

export default function TaskTitleComponent() {
  return (
    <>
      <TextField
        margin="dense"
        required
        fullWidth
        color="secondary"
        label="Task Title"
        name="taskTitle"
        multiline
        maxRows={2}
        inputProps={{
          maxLength: 60,
        }}
      />
    </>
  );
}
