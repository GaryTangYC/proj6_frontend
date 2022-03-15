import { Card, CardContent } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "./../../store";




export default function TaskCardComponent() {
  // const { store } = useContext(Context);
  // const { user, token } = store
  // const [ allTask, setAllTask ] = useState([]);

//   const bckendUrl = `${process.env.REACT_APP_BCKEND_BASE_URI}/task/getAllTask`;
//   const id = user.id
//   console.log('id', id)
// useEffect( () => {
//   const getTask = axios.get(bckendUrl, id, token)
//   .then((result) => {
//     setAllTask(result.data)
//     console.log('axios call data',result.data)
//   })
// }, []);
//   console.log('setstate alltask',allTask)  

  return (
    <>
      <Card>
{/* <CardContent /> */}
<CardContent>
  <div>
    <h2>Wassup</h2>
                <p>Tryy</p>
  </div>
  </CardContent> 
</Card>
    </>
  );
}