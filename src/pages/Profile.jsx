/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import ProfileAccordions from "../components/profile/ProfileAccordion";

import { useContext, useEffect, useState } from "react";
import { Context } from "./../store";
import axios from "axios";
import { Typography } from "@mui/material";

export default function ProfilePage() {
  const { store } = useContext(Context);
  const { user, token } = store;
  const { payment: customerId } = user;

  const [options, setOptions] = useState({});

  useEffect(() => {
    const retrieveSecret = async () => {
      const auth = { headers: { Authorization: `Bearer ${token}` } };
      const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/user/secret`;

      const formData = {
        customerId: customerId,
      };

      try {
        const result = await axios.post(bckendUrl, formData, auth);
        const { client_secret: clientSecret } = result.data;

        setOptions({
          clientSecret: clientSecret,
          appearance: { theme: "stripe" },
        });
      } catch (err) {
        console.log(err);
      }
    };
    retrieveSecret();
  }, []);

  return (
    <DashboardContent title="Profile">
      {options.clientSecret ? (
        <ProfileAccordions options={options} />
      ) : (
        <Typography>Unable to get client secret.</Typography>
      )}
    </DashboardContent>
  );
}
