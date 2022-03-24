import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "./../../store";
import axios from "axios";
import "./styles.css";
/* mui imports */
import {
  TextField,
  Box,
  FormControl,
  Container,
  Autocomplete,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
/* widget/component imports */
import SubmitBtn from "../../widgets/SubmitBtn";
import TaskFieldComponent from "./TaskFieldComponent";
import RewardsPenaltyComponent from "./RewardsPenaltyComponent";

/* date/time Imports - to be moved to widgets once OK */
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DesktopDateTimePicker } from "@mui/lab";

export default function AddTaskForm() {
  // State to track form inputs
  const [dateTime, setDateTime] = useState(new Date());
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [penaltyAmount, setPenaltyAmount] = useState()
  const [rewardsPenalty, setRewardsPenalty] = useState("Nil");
  const [taskTag, setTaskTag] = useState("None");
  const taskTagList = [
    "None",
    "Studies",
    "Exercises",
    "Work",
    "Chores",
    "Finance",
    "Health & Wellness",
    "Creativity",
  ];
  const [isRadioDisabled, setIsRadioDisabled] = useState(true);
  const handleRadio = (e) => {
    setIsRadioDisabled(!isRadioDisabled);
  };
  // useContext to obtain user and partner
  const { store } = useContext(Context);
  const { user, token } = store;
  // Prepare auth to ensure userID and data passes in to backend when page navigate to home
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  const { userId } = useParams();
  let validId;
  if (!userId) {
    validId = user._id;
  } else {
    validId = userId;
  }
  const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/addNewTask`;
  const navigate = useNavigate();

  // Submit button functionality to backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    const getFormData = new FormData(event.currentTarget);
    
    //Data check penalty amount

    const data = {
      owner: user._id,
      dateTime,
      financialPenalty: getFormData.get("financialPenalty"),
      taskDescription: getFormData.get("taskDescription"),
      taskTag,
      rewardsPenalty: getFormData.get("rewardsPenalty"),
      penaltyAmount: getFormData.get("penaltyAmount")
    };
    console.log("this is getFinAmount", getFormData.get("penaltyAmount"));
    console.log("this is getformdata", getFormData);
    console.log("this is data", data);

    const postTask = await axios.post(bckendUrl, data, auth);
    console.log(postTask.data);
    alert("Task Added!");
    navigate("/home");
    if (postTask.data.err) {
      return alert(postTask.data.err);
    }
  };

  const handleChange = (e, value) => {
    setTaskTag(value);
    console.log("taskTag cahnge", taskTag);
  };

  return (
    <>
      <Container maxWidth="xl" spacing={8}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          style={{ minHeight: "55vh" }}
          bgcolor="primary"
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 1 }}
          >
            <FormControl sx={{ my: 1, minWidth: "60vw" }}>
              {/* Task Description Component */}
              <TaskFieldComponent
                onChange={(newValue) => {
                  setTaskDescription(newValue);
                }}
              />
              {/* Date Time Picker */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDateTimePicker
                  value={dateTime}
                  minDateTime={new Date()}
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
              {/* Task Tag Selection */}
              <Autocomplete
                id="task-tag-autocomplete"
                sx={{ mt: 2, mb: 1 }}
                defaultValue="None"
                onChange={handleChange}
                // taskTagList array is mapped into options and rendered
                options={taskTagList.map((option) => option)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ mt: 1, mb: 2 }}
                    color="secondary"
                    label="Task Tag"
                  />
                )}
              />
              {/* Financial Penalty Selection */}
              <FormLabel
                color="secondary"
                id="financial-penalty-radio-buttons-group"
              >
                Financial Penalty
              </FormLabel>
              <RadioGroup
                row
                name="financialPenalty"
                defaultValue={false}
                onChange={handleRadio}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio color="secondary" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="secondary" />}
                  label="No"
                />

                  <TextField
                  disabled={isRadioDisabled}                  
                  label="Penalty Value (S$)"
                  defaultValue="0"
                  color="secondary"
                  name="penaltyAmount"
                  onChange={(event) => {
                  const {value } = event.target                    
                  setPenaltyAmount(value);                  
                }}
                type='number'

                />
              </RadioGroup>


              {/* Rewards/Penalty Description */}
              <RewardsPenaltyComponent
                onInputChange={(newValue) => {
                  console.log(newValue);
                  setRewardsPenalty(newValue);
                }}
              />
              {/* Submit Button from Widget */}
              <SubmitBtn text="Add Task" />
            </FormControl>
          </Box>
        </Box>
      </Container>
    </>
  );
}
