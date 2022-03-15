import { Card, CardContent } from "@mui/material";
import { useContext } from "react";
import { Context } from "./../../store";

export default function TaskCardComponent() {
  const { store } = useContext(Context);
  const { tasks } = store;

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
