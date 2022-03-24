import { useEffect, useState } from "react";
/* mui imports */
import { RadioGroup, FormLabel, FormControlLabel, Radio, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";


export default function FinancialPenaltyComponent() {

const [isRadioDisabled, setIsRadioDisabled] = useState(false)

  const handleChange = (e, value) => {
    setIsRadioDisabled(value);
     };

  useEffect(() => {
     console.log("isradiodisabled change", isRadioDisabled);
  }, [isRadioDisabled])

  return (
    <>
      <FormLabel color="secondary" id="financial-penalty-radio-buttons-group">
        Financial Penalty
      </FormLabel>
      <RadioGroup row name="financialPenalty" defaultValue={false} onChange={handleChange}  >
        <FormControlLabel value="true" control={<Radio color='secondary'/>} label="Yes" />
        <FormControlLabel value="false" control={<Radio color='secondary' />} label="No" />
        < TextField disabled={isRadioDisabled} id="outlined-disabled"
          label="Disabled"
          defaultValue="Hello World" />
      </RadioGroup>
    </>
  );
}
