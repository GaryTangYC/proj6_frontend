import axios from "axios";
/* react imports */
import { useContext, useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import { Context } from "./../store";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";
import TaskCardComponent from "../components/home/TaskCardComponent";

export default function HomePage() {
  const { store } = useContext(Context);
  const { user, token } = store;

  const [allTask, setAllTask] = useState(null);
  const [loading, setLoading] = useState("false");

  const userId = user.id

  const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/getAllTask/${userId}`;

  useEffect(() => {
    

   (async () => {
      const result = await axios.get(bckendUrl);
      console.log(result);
      setAllTask(result.data)
    })();
    // axios
    //   .get(bckendUrl)
    //   .then((res) => {
    //     setAllTask(res.data);
    //     console.log("setstate alltask inside ueseffect", allTask);
    //   });

    // // console.log('axios call data',fetchTask)
    // console.log("setstate alltask inside ueseffect", allTask);

  }, []);

  console.log("setstate alltask", allTask);

  const getData = () => {
    console.log('button click')
    const getData = axios.get(bckendUrl)

      .then((res) => {
        setAllTask(res.data);
        console.log("setstate alltask inside useEffect", allTask);
      })
      .catch(err => {
        console.log('this is err', err)
      });
  };

  return (
    <DashboardContent>
      <h2>Outstanding Tasks</h2>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          {`This is user name after signing in ${user.name}`}
          <br></br>
          {`This is user bio after signing in ${user.bio}`}
          <br></br>
          {`This is user id after signing in ${user.id}`}
          <br></br>
          {`This is token after signing in ${token}`}
          <TaskCardComponent />
          <TaskCardComponent />
          <TaskCardComponent />
          <Button onClick={getData} >
            Click Me
          </Button>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
