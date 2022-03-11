import { useState } from "react";
/* mui imports */
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Link,
  Box,
  Typography,
  FormControl,
  FormLabel,
  Container,
  Radio,
  RadioGroup,
  checkboxClasses,
  Autocomplete,
} from "@mui/material";
/* widget/component imports */
import SubmitBtn from "../../widgets/SubmitBtn";

/* date/time Imports - to be moved to widgets once OK */
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DesktopDateTimePicker } from "@mui/lab";

export default function AddTaskForm() {
  // State to track dateTime
  const [dateTime, setDateTime] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState();
  const [rewardsPenalty, setRewardsPenalty] = useState();
  const [partner, setPartner] = useState("");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const data1 = {
      dateTime,
      financialPenalty: data.get("financialPenalty"),
      taskDescription: data.get("taskDescription"),
      taskTag: data.get("taskDescription"),
      rewardsPenalty: data.get("rewardsPenalty"),
    };
    // console.log({
    //   dateTime,
    //   financialPenalty: data.get("financialPenalty"),
    //   task: data.get("task"),
    // });
    console.log("this is data", data1);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl fullWidth sx={{ my: 1 }}>
            {/* Date Time Picker */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDateTimePicker
                value={dateTime}
                onChange={(newValue) => {
                  setDateTime(newValue);
                }}
                label="Date & Time"
                name="dateTime"
                renderInput={(props) => (
                  <TextField {...props} color="secondary" />
                )}
              />
            </LocalizationProvider>
            {/* Task Description Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              color="secondary"
              label="Task Description"
              name="taskDescription"
              multiline
              maxRows={7}
              onChange={(newValue) => {
                setTaskDescription(newValue);
              }}
            />
            {/* Task Tag Selection */}
            <Autocomplete
              id="task-tag-autocomplete"
              sx={{ my: 1 }}
              defaultValue="None"
              onChange={(e, value) => {
                setTaskTag(value);
              }}
              // taskTagList array is mapped into options and rendered
              options={taskTagList.map((option) => option)}
              renderInput={(params) => (
                <TextField {...params} label="Task Tag" />
              )}
            />
            {/* Financial Penalty Selection */}
            <FormLabel
              color="secondary"
              id="financial-penalty-radio-buttons-group"
            >
              Financial Penalty
            </FormLabel>
            <RadioGroup row name="financialPenalty">
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
            {/* Rewards/Penalty Description */}
            <TextField
              margin="normal"
              fullWidth
              multiline
              maxRows={7}
              color="secondary"
              label="Rewards/Penalty Description"
              name="rewardsPenalty"
              onChange={(newValue) => {
                setRewardsPenalty(newValue);
              }}
            />
            {/* Accountability Partner Selection - to be replaced with axios call later on  */}
            <TextField
              margin="normal"
              fullWidth
              color="secondary"
              label="Accountability Partner"
              name="partner"
              onChange={(newValue) => {
                setPartner(newValue);
              }}
            />
          </FormControl>
          {/* Submit Button from Widget */}
          <SubmitBtn text="Add Task" />
        </Box>
      </Container>
    </>
  );
}

// Accountability partner code to be replaced with an axios call to retrieve friends list once setup is done. Reference code as below:

// const PartnerChoice = ({ setPartner, setAppState }) => {
//   const [friends, setFriends] = useState([]);

//   // Get curren user id from local storage
//   const currentUserId = localStorage.getItem('userId');
//   // AJAX Call: get friends of user from db
//   useEffect(() => {
//     axios.get(`/user/allFriends/${currentUserId}`)
//       .then((result) => {
//         setFriends(result.data);
//         console.log('axios get friends', result.data);
//       });
//   }, []);
//   console.log('friends', friends);
//   const handleChange = (e, value) => {
//     // sets chosen partner's uid
//     console.log('partner value', value.id);
//     setPartner(`${value.id}`);
//   };

//   const addFriendsClick = (e) => {
//     e.preventDefault();
//     setAppState('friends');
//   };
