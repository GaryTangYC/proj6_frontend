// Tried refactoring but failed - to be work on later
import { useState } from "react";
import { TextField } from "@mui/material"
import { LocalizationProvider,DesktopDateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function DateTimeComponent(newValue) {
   const [dateTime, setDateTime] = useState(new Date());

  return (
    <>
<LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDateTimePicker
                value={dateTime}
                onChange={(newValue) => {
                  setDateTime(newValue);
                }}
                label="Date & Time For Completion"
                name="dateTime"
                renderInput={(props) => (
                  <TextField {...props} color="secondary" />
                )}
              />
            </LocalizationProvider> 
    </>
  );
}
