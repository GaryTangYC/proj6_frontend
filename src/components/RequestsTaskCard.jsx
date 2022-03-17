import { Card, CardContent } from "@mui/material";

export default function RequestTaskCard({ tasks }) {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Card key={task._id}>
            <CardContent>
              <h4>{task.description}</h4>
              <p>{task.endText}</p>
              <p>Owner: {task.owner.name}</p>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
