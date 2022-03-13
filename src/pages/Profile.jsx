/* react imports */
import { useRef, useContext } from "react";
import { Context } from "./../store";
/* mui imports */
import { Box, TextField } from "@mui/material";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import ProfileAccordions from "../components/profile/ProfileAccordion";
import SubmitBtn from "../widgets/SubmitBtn";
/* other imports */
import axios from "axios";

export default function ProfilePage() {
  const AddPic = () => {
    const { store, dispatch } = useContext(Context);
    const { user, token } = store;
    const fileInput = useRef();

    const doUpload = async (evt) => {
      evt.preventDefault();
      const auth = { headers: { Authorization: `Bearer ${token}` } };
      const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/user/pic`;

      const file = fileInput.current.files[0];
      if (!file || file.type.split("/")[0] !== "image" || file.size > 200000) {
        alert("nil file, file size too big, or non-image file chosen");
        return;
      }

      /* this part is to change uploaded file name so will not haf duplicate file names */
      const blob = file.slice(0, file.size, file.type);
      const newFile = new File(
        [blob],
        `${file.name.split(".")[0]}-${file.lastModified}.${
          file.name.split(".")[1]
        }`,
        { type: file.type }
      );
      console.log(newFile);
      const formData = new FormData();
      formData.append("profilePic", newFile);
      formData.append("id", user.id);
      const result = await axios.post(bckendUrl, formData, auth);
      // if (user.data.err) {
      //   return alert(user.data.err);
      // }

      console.log(result);
    };

    return (
      <Box component="form" onSubmit={doUpload} noValidate>
        <TextField
          required
          inputRef={fileInput}
          color="secondary"
          placeholder="please upload profile file here"
          type="file"
        />
        <SubmitBtn text="Upload" />
      </Box>
    );
  };

  return (
    <DashboardContent title="Profile">
      <ProfileAccordions />
      <AddPic />
    </DashboardContent>
  );
}
