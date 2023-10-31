/* eslint-disable react/prop-types */
const Topics = ({ transcript }) => {
  return (
    <div>
      <h3>Topics Detected: </h3>
      <div>
        {Object.keys(transcript.iab_categories_result.summary)
          .filter(
            (topic) => transcript.iab_categories_result.summary[topic] > 0.6
          )
          .map((topic) => (
            <span
              key={transcript.iab_categories_result.summary[topic]}
              style={{
                fontSize: "small",
                backgroundColor: "blueviolet",
                paddingInline: "0.25rem",
                borderRadius: "10px",
                marginInline: "0.5  rem",
              }}>
              {topic.split(">").pop()}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Topics;
