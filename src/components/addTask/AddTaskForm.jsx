import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./../../store";
import axios from "axios";
/* mui imports */
import {
  TextField,
  Box,
  Typography,
  FormControl,
  Container,
  Autocomplete,
} from "@mui/material";
/* widget/component imports */
import SubmitBtn from "../../widgets/SubmitBtn";
import TaskFieldComponent from "./TaskFieldComponent";
import FinancialPenaltyComponent from "./FinancialPenaltyComponent";
import RewardsPenaltyComponent from "./RewardsPenaltyComponent";

/* date/time Imports - to be moved to widgets once OK */
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DesktopDateTimePicker } from "@mui/lab";

export default function AddTaskForm() {
  // State to track form inputs
  const [dateTime, setDateTime] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState();
  const [rewardsPenalty, setRewardsPenalty] = useState();  
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

  // useContext to obtain user and partner
  const { store } = useContext(Context);
  const { user, token } = store;

  const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/addNewTask`;
  const navigate = useNavigate();

  // Submit button functionality to backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    const getFormData = new FormData(event.currentTarget);
    // const taskTagTest = getFormData.get("taskTag");
    
    const data = {
      owner: user.id,
      dateTime,
      financialPenalty: getFormData.get("financialPenalty"),
      taskDescription: getFormData.get("taskDescription"),
      taskTag,
      rewardsPenalty: getFormData.get("rewardsPenalty"),
    };
    console.log("this is getformdata", getFormData);
    console.log("this is data", data);

    const postTask = await axios.post(bckendUrl, data);
    console.log(postTask.data);
    alert("Task Added!")
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
      <Container maxWidth="xl">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth sx={{ my: 1 }}>
            {/* Task Description Component */}
            <TaskFieldComponent
              onChange={(newValue) => {
                setTaskDescription(newValue);
              }}
            />
            {/* Date Time Picker - to refactor */}
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
              sx={{ my: 1 }}
              defaultValue="None"
              onChange={handleChange}
              // taskTagList array is mapped into options and rendered
              options={taskTagList.map((option) => option)}
              renderInput={(params) => (
                <TextField {...params} label="Task Tag" />
              )}
            />
            {/* Financial Penalty Selection */}
            <FinancialPenaltyComponent />

            {/* Rewards/Penalty Description */}
            <RewardsPenaltyComponent
              onInputChange={(newValue) => {
                console.log(newValue);
                setRewardsPenalty(newValue);
              }}
            />
            {/* Accountability Partner Selection - Placeholder to be replaced with axios call later on  */}
            {/* <TextField
              margin="normal"
              fullWidth
              color="secondary"
              label="Accountability Partner"
              name="partner"
              onChange={(newValue) => {
                setPartner(newValue);
              }}
            /> */}
          </FormControl>
          {/* Submit Button from Widget */}
          <SubmitBtn text="Add Task" />
        </Box>
      </Container>
    </>
  );
}
