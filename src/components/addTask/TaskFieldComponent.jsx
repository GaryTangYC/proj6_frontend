import { TextField } from "@mui/material"

export default function TaskFieldComponent() {
 
  return (
    <>      
 <TextField
              margin="normal"
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
