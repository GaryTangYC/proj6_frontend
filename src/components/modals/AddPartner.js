/* react imports */
import { useState, useRef } from "react";
/* mui imports */
import { Box, Modal, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
/* widget/component imports */
import SubmitBtn from "../../widgets/SubmitBtn";
/* other imports */
import axios from "axios";

/* change default Box css */
const MyBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: theme.palette.background.default,
  border: "2px solid #ececec",
  boxShadow: 24,
}));



const AddPartnerModal = ({addPartnerModal, setAddPartnerModal}) => {
  
  const userNameInput = useRef();

  const doSubmit = (evt) => {
    evt.preventDefault();
 
  };
  return (
    <Modal open={addPartnerModal} onClose={setAddPartnerModal(false)}>
      <MyBox>
        <h3 >Provide user name</h3>
        <form noValidate autoComplete="off" onSubmit={doSubmit}>
          <TextField
            required
            inputRef={userNameInput}
            color="secondary"
            placeholder="any user name you like, <>=@{}; characters not allowed"
            variant="outlined"
          />
          <br></br>
          <SubmitBtn text="Request partner" />
        </form>
      </MyBox>
    </Modal>
  );
};

export default AddPartnerModal;
