import Highlighted from "./Highlighted";
import Topics from "./Topics";

/* eslint-disable react/prop-types */
const Result = ({ transcript }) => {
  return (
    <div>
      <p>
        {transcript.sentiment_analysis_results.map((result) => (
          <Highlighted
            key={result.confidence}
            text={result.text}
            sentiment={result.sentiment}
            entities={transcript.entities}
          />
        ))}
      </p>
      <Topics transcript={transcript} />
    </div>
  );
};

export default Result;
