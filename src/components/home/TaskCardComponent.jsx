/* react imports */
import React from "react";
import { useContext, useState } from "react";
import { Context } from "./../../store";
/* mui imports */
import { Card, CardContent, Stack, Grid } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
/* widget/component imports */
import TaskCardBtn from "../../widgets/TaskCardBtn";
import AddPartnerModal from "../modals/AddPartner";

export default function TaskCardComponent() {
  const { store } = useContext(Context);
  const { tasks } = store;
   const [addPartnerModal, setAddPartnerModal] = useState(false);
  
  console.log("'This is modal state", addPartnerModal)
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
            <Stack container spacing={2}>
              <TaskCardBtn
                text="Complete"
                color="success"
                icon={<DoneIcon />}
              />
              <TaskCardBtn
                text="Add Partner"
                color="info"
                icon={<PersonAddIcon />}
                click={() => {
                  setAddPartnerModal(true);
                }}
              />
              <TaskCardBtn text="Chat" icon={<ChatIcon />} />
            </Stack>
          </Card>
        );
      })}
      <AddPartnerModal addPartnerModal={addPartnerModal} setAddPartnerModal={setAddPartnerModal}/>
    </>
  );
}
// export default React.memo(TaskCardComponent);
/* color for info, success can be adjusted in palette.js */
