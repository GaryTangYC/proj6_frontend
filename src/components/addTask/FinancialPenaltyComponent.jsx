/* mui imports */
import { RadioGroup, FormLabel, FormControlLabel, Radio } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function FinancialPenaltyComponent() {
  /* change default FormControlLabel css */
  const MyFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    "& .css-1n61jud-MuiButtonBase-root-MuiRadio-root.Mui-checked": {
      color: theme.palette.secondary.main,
    },
  }));

  return (
    <>
      <FormLabel color="secondary" id="financial-penalty-radio-buttons-group">
        Financial Penalty
      </FormLabel>
      <RadioGroup row name="financialPenalty" defaultValue={false}>
        <MyFormControlLabel value="true" control={<Radio />} label="Yes" />
        <MyFormControlLabel value="false" control={<Radio />} label="No" />
      </RadioGroup>
    </>
  );
}
