/* react imports */
import { useContext, useState } from "react";
import { Context } from "./../store";
import { useNavigate, useLocation } from "react-router-dom";
/* mui imports */
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
/* other imports */
import io from "socket.io-client";

export default function ChatsPage() {
  const { store } = useContext(Context);
  const { user, token } = store;
  // const socket = io.connect(process.env.REACT_APP_BCKEND_BASE_URI)
  // socket.emit("testing", {msg: "this is sent from front end socket emitting testing!"})
  const location = useLocation();

  const {taskInfo} = location.state 
  console.log(taskInfo)
  const navigate = useNavigate();
  return (
    <DashboardContent>
      <IconButton
        onClick={() => {
          navigate(-1);
        }}
      >
        <CancelIcon />
      </IconButton>
      <>This chat belongs to {taskInfo._id} with description {taskInfo.description}</>
      <>Owner of this task is  {taskInfo.owner.name} with id {taskInfo.owner._id}</>
      <>Person who started this chat is {user.name} with id {user._id}</>
      
    </DashboardContent>
  );
}
