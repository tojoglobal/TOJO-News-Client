import React from "react";
import { format } from "date-fns";

const DateAndTime = ({ dateAndTime }) => {
  return (
    <>
      {dateAndTime
        ? format(new Date(dateAndTime), "MMM d, yyyy, hh:mm a")
        : "Dec 21, 2018, 07:00"}
    </>
  );
};

export default DateAndTime;
