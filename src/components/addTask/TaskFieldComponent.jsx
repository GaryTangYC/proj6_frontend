import { TextField } from "@mui/material";

export default function TaskFieldComponent() {
  return (
    <>      
 {/* <TextField
              margin="normal"
              required
              fullWidth
              color="secondary"
              label="Task Description"
              name="taskDescription"
              multiline
              maxRows={7}              
            />  */}
    {/* Boon Wee Changes*/}
   
    
      <TextField
        sx={{ mt: 1, mb: 2 }}
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
