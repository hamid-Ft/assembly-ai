// eslint-disable-next-line react/prop-types
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
