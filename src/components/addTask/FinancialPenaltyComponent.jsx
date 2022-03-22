import {   RadioGroup, FormLabel,   FormControlLabel, Radio} from "@mui/material";

export default function FinancialPenaltyComponent() {
  return (
    <>
      <FormLabel color="secondary" id="financial-penalty-radio-buttons-group">
        Financial Penalty
      </FormLabel>
      <RadioGroup row name="financialPenalty" defaultValue={false}  >
        <FormControlLabel value="true" control={<Radio color='secondary'/>} label="Yes" />
        <FormControlLabel value="false" control={<Radio color='secondary' />} label="No" />
      </RadioGroup>
    </>
  );
}
