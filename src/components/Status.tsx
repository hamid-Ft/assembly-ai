import React from "react";

const Status = ({ isLoading, status }) => {
  return (
    <div>
      <p>
        {isLoading
          ? `Calculating...${status || "uploading "}...`
          : "Give me audio!"}
      </p>
    </div>
  );
};

export default Status;
