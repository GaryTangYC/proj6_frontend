import { Card, CardContent } from "@mui/material";
import React from "react";

export default function RequestTaskCard({ tasks }) {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Card key={task._id}>
            {/* <CardContent /> */}
            <React.Fragment>
              <CardContent>
                <h4>{task.description}</h4>
                <p>{task.endText}</p>
                <p>Owner: {task.owner.name}</p>
              </CardContent>
            </React.Fragment>
          </Card>
        );
      })}
    </>
  );
}

/* tried adding <React.Fragment> to get rid of the console error msg... but no joy...  */