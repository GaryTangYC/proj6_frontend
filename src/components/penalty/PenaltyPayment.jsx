import { useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Context } from "./../../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PenaltyPayment({ paymentList, taskId }) {
  const { store } = useContext(Context);
  const { user, token } = store;
  const { payment: customerId } = user;
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();
    console.log(event.target.value);    

    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/user/payment-intent`;
    const postCompleteBckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/completeTask`

    const formData = {
      customerId: customerId,
      methodId: event.target.value,
    };

    try {
      const result = await axios.post(bckendUrl, formData, auth);
      console.log(result);

      // if result.status == 200 then manipulate task db as completed
      if (result.statusCode === 200) {
        const postCompleteTask = await axios.post(
          postCompleteBckendUrl,
          {
            taskId,
          },
          auth
        );
        alert("Payment Received. Task will be removed in Home Page");
        navigate("/home")
      } else {
        // else alert and renavigate to home
        alert("Error with Payment. Please re-try");
        navigate("/home")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {paymentList.map((method) => {
        const methodId = method.id;
        const cardBrand = method.card.brand;
        // const expMth = method.card.exp_month;
        // const expYr = method.card.exp_year;
        // const lastFour = method.card.last4;

        return (
          <Button
            key={methodId}
            variant="contained"
            size="large"
            disableElevation
            onClick={handleClick}
            value={methodId}
          >
            {cardBrand}
          </Button>
        );
      })}
    </>
  );
}
