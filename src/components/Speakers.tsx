import { Transcript } from '../types/transcript';

const Speakers = ({ transcript }: { transcript: Transcript }) => {
    return (
        <div>
            <h3>Speakers: </h3>
            <div>
                {transcript.utterances?.map(utterance => (
                    <div key={utterance.start}>
                        <span className="font-bolder pr-2">
                            {`${utterance.speaker}: ${utterance.text}`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Speakers;
