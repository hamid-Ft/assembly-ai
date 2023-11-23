import React from 'react';
import type { Transcript } from './AudioRecorder';
const Speakers = ({ transcript }: { transcript: Transcript }) => {
  return (
    <div>
      <h3>Speakers: </h3>
      <div>
        {transcript.utterances?.map((utterance) => (
          <div key={utterance.start}>
            <span style={{ fontWeight: 'bolder', paddingRight: '8px' }}>{utterance.speaker}:</span>
            <span>{utterance.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Speakers;
