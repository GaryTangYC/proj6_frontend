/* react imports */
import { useContext } from "react";
import { Context } from "./../store";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";

export default function HomePage() {
  const { store } = useContext(Context);
  const { user, token } = store;

  return (
    <DashboardContent>
      {`This is user name after signing in ${user.name}`}
      <br></br>
      {`This is user bio after signing in ${user.bio}`}
      <br></br>
      {`This is user id after signing in ${user.id}`}
      <br></br>
      {`This is token after signing in ${token}`}
    </DashboardContent>
  );
}
