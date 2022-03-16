import { Card, CardContent, Stack, Grid } from "@mui/material";
import { useContext } from "react";
import { Context } from "./../../store";
import CompleteBtn from "../../widgets/CompleteBtn";
import ChatBtn from "../../widgets/ChatBtn";
import AddPartnerBtn from "../../widgets/AddPartnerBtn";
import { parseJSON } from "date-fns"

export default function TaskCardComponent() {
  const { store } = useContext(Context);
  const { tasks } = store;

  const CompleteFn = (e) => {
    e.preventDefault()
    console.log('button clicked')
  }


  return (
    <>
      {tasks.map((task) => {
        return (
          <Card key={task._id}>
            {/* <CardContent /> */}
            <CardContent>
              <h4>{task.description}</h4>
              <p>{task.endText}</p>              
            </CardContent>
             <Stack container spacing ={2}>
            < CompleteBtn text="Complete" onclick={CompleteFn} / >
            < AddPartnerBtn text="Add Partner" / >
            < ChatBtn text="Chat" / >
            </Stack>
          </Card>
        );
      })}
    </>
  );
}
