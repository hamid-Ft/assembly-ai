import React from "react";

interface StatusProps {
  isLoading: boolean;
  status: string;
}

const Status = ({ isLoading, status }: StatusProps) => {
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
