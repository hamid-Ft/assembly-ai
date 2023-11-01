/* eslint-disable react/prop-types */
const Speakers = ({ transcript }) => {
  return (
    <div>
      <h3>Speakers: </h3>
      <div>
        {transcript.utterances.map((utterance) => (
          <div key={utterance.start}>
            <span style={{ fontWeight: "bolder", paddingRight: "8px" }}>
              {utterance.speaker}:
            </span>
            <span>{utterance.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Speakers;
