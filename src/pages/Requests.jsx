import * as React from "react";
import { useState } from "react";
import DashboardContent from "../layouts/DashBoard";

const title = "Requests";

export default function RequestPage() {
  let [reqType, setReqType] = useState();

  const renderOne = (
    <>
      <button type="button" onClick={(setReqType = false)}>
        request type 1
      </button>
    </>
  );

  const renderTwo = (
    <>
      <button type="button" onClick={(setReqType = true)}>
        request type 2
      </button>
    </>
  );

  if (reqType) {
    return (
      <>
        <DashboardContent title={title} render={renderOne} />;
      </>
    );
  } else {
    return (
      <>
        <DashboardContent title={title} render={renderTwo} />;
      </>
    );
  }
}
