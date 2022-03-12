import { TextField } from "@mui/material";

export default function RewardsPenaltyComponent() {
  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        multiline
        maxRows={7}
        color="secondary"
        label="Rewards/Penalty Description"
        name="rewardsPenalty"
      />
    </>
  );
}
