import DashboardContent from "../layouts/DashBoard";
import axios from "axios";
import { useLocation } from "react-router-dom";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

import PenaltyPayment from "../components/penalty/PenaltyPayment";

// const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
// const stripePromise = loadStripe(publishableKey);

export default function Penalty() {
  const location = useLocation();
  const { paymentList } = location.state;

  console.log(paymentList);
  return (
    <>
      <DashboardContent title="Penalty">
        <PenaltyPayment paymentList={paymentList} />
      </DashboardContent>
    </>
  );
}
