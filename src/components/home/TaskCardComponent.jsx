import { Card, CardContent } from "@mui/material";

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
          </Card>
        );
      })}
    </>
  );
}
