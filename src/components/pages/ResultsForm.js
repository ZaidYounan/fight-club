import React from "react";
import "../../App.css";
import UpdateResults from "../UpdateResults";

function ScheduleForm({ id }) {
  return (
    <div>
      <UpdateResults id={id} />
    </div>
  );
}

export default ScheduleForm;