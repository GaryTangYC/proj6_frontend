import { useContext } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Context } from "./../../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Paper, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import "./styles.css";
import Typography from "@mui/material/Typography";

export default function PenaltyPayment({ paymentList, taskId }) {
  const { store } = useContext(Context);
  const { user, token, tasks } = store;
  const { payment: customerId } = user;
  const navigate = useNavigate();

  const taskData = [...tasks];
  let taskToPay = taskData.filter((task) => task._id === taskId);

  const handleClick = async (event) => {
    event.preventDefault();
    // please use currentTarget and not target because target is specific to element clicked not the onlick element
    console.log("line 37", event.currentTarget.value);

    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/user/payment-intent`;
    const postCompleteBckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/completeTask`;

    const formData = {
      customerId: customerId,
      methodId: event.currentTarget.value,
      centsAmount: taskToPay[0].penaltyAmount * 100,
    };

    console.log("line 49", formData);

    try {
      const result = await axios.post(bckendUrl, formData, auth);
      console.log(result);

      // if result.status == 200 then manipulate task db as completed
      if (result.status === 200) {
        const postCompleteTask = await axios.post(
          postCompleteBckendUrl,
          {
            taskId,
          },
          auth
        );
        alert("Payment Received. Task will be removed in Home Page");
        navigate("/home");
      } else {
        // else alert and renavigate to home
        alert("Error with Payment. Please re-try");
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box m={3}>
        {paymentList.length < 1 ? (
          <Typography>
            Please add a payment method at profile before continuing.
          </Typography>
        ) : (
          <Grid container>
            <Grid item xs={3}>
              <Paper variant="outlined">
                <Box m={1} sx={{ textAlign: "center" }}>
                  <Typography variant="h2" component="h2">
                    Choose a payment method:
                  </Typography>
                  <br />
                  <Stack spacing={1}>
                    {paymentList.map((method) => {
                      const methodId = method.id;
                      console.log("in map", methodId);
                      const cardBrand = method.card.brand;
                      const expMth = method.card.exp_month;
                      const expYr = method.card.exp_year;
                      const lastFour = method.card.last4;

                      if (cardBrand === "visa") {
                        return (
                          <Button
                            color="info"
                            key={methodId}
                            variant="contained"
                            size="large"
                            disableElevation
                            onClick={handleClick}
                            value={methodId}
                          >
                            <Grid container alignItems="center">
                              <Grid item xs={4}>
                                <Box sx={{ mt: 1 }}>
                                  <img
                                    src="/cc-visa-brands.svg"
                                    alt="visa"
                                    width="42"
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={8}>
                                <Grid item xs={12}>
                                  **** {lastFour}
                                </Grid>
                                <Grid item xs={12}>
                                  Exp {expMth}/{expYr}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Button>
                        );
                      } else if (cardBrand === "mastercard") {
                        return (
                          <Button
                            color="warning"
                            key={methodId}
                            variant="contained"
                            size="large"
                            disableElevation
                            onClick={handleClick}
                            value={methodId}
                          >
                            <Grid container alignItems="center">
                              <Grid item xs={4}>
                                <Box sx={{ mt: 1 }}>
                                  <img
                                    src="/cc-mastercard-brands.svg"
                                    alt="master"
                                    width="42"
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={8}>
                                <Grid item xs={12}>
                                  **** {lastFour}
                                </Grid>
                                <Grid item xs={12}>
                                  Exp {expMth}/{expYr}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Button>
                        );
                      } else if (cardBrand === "amex") {
                        return (
                          <Button
                            color="success"
                            key={methodId}
                            variant="contained"
                            size="large"
                            disableElevation
                            onClick={handleClick}
                            value={methodId}
                          >
                            <Grid container alignItems="center">
                              <Grid item xs={4}>
                                <Box sx={{ mt: 1 }}>
                                  <img
                                    src="/cc-amex-brands.svg"
                                    alt="visa"
                                    width="42"
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={8}>
                                <Grid item xs={12}>
                                  **** {lastFour}
                                </Grid>
                                <Grid item xs={12}>
                                  Exp {expMth}/{expYr}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Button>
                        );
                      } else {
                        return (
                          <Button
                            key={methodId}
                            variant="contained"
                            size="large"
                            disableElevation
                            onClick={handleClick}
                            value={methodId}
                          >
                            <Grid container alignItems="center">
                              <Grid item xs={4}>
                                <Box sx={{ mt: 1 }}>
                                  <img
                                    src="/cc-stripe-brands.svg"
                                    alt="visa"
                                    width="42"
                                  />
                                </Box>
                              </Grid>
                              <Grid item xs={8}>
                                <Grid item xs={12}>
                                  **** {lastFour}
                                </Grid>
                                <Grid item xs={12}>
                                  Exp {expMth}/{expYr}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Button>
                        );
                      }
                    })}
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
}
