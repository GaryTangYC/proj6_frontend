import { TextField } from "@mui/material"

export default function TaskFieldComponent() {
 
  return (
    <>      
 <TextField
              margin="dense"
              required
              fullWidth
              color="secondary"
              label="Task Description"
              name="taskDescription"
              multiline
              maxRows={7}              
            /> 
    </>
  );
}
