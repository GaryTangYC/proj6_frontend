/* react imports */
import { useState } from "react";
/* widget/component imports */
import DashboardContent from "../layouts/DashBoard";

export default function RequestPage() {
  let [reqType, setReqType] = useState(null);

  const renderOne = (
    <>
      <button type="button" onClick={()=>{setReqType(true)}}>
        request type 1
      </button>
    </>
  );

  const renderTwo = (
    <>
      <button type="button" onClick={()=>{setReqType(null)}}>
        request type 2
      </button>
    </>
  );

  return (
    <DashboardContent title="Requests">
      {reqType === null ? renderOne : renderTwo}
    </DashboardContent>
  );
}

/* 
shld be using mui <Button> component above rather than vanilla html <button> above 
*/
