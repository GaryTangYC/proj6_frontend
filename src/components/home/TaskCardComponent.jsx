import { Card, CardContent, Stack } from "@mui/material";
import CompleteBtn from "../../widgets/CompleteBtn";
import ChatBtn from "../../widgets/ChatBtn";
export default function TaskCardComponent({ tasks }) {


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
             <Stack direction="row" spacing={2}>
            < CompleteBtn text="Complete" / >
            < ChatBtn text="Chat" / >
            </Stack>
          </Card>
        );
      })}
    </>
  );
}
