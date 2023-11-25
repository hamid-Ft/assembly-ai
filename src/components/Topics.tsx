import { Transcript, Summary } from '../types/transcript';

const Topics = ({ transcript }: { transcript: Transcript }) => {
    return (
        <div>
            <h3>Topics Detected: </h3>
            <div>
                {transcript.iab_categories_result &&
                    Object.keys(transcript.iab_categories_result.summary)
                        .filter(
                            topic =>
                                transcript.iab_categories_result?.summary &&
                                transcript.iab_categories_result.summary[
                                    topic as keyof Summary
                                ] > 0.7,
                        )
                        .map(topic => (
                            <span
                                key={topic}
                                style={{
                                    fontSize: 'small',
                                    backgroundColor: 'blueviolet',
                                    paddingInline: '0.25rem',
                                    borderRadius: '10px',
                                    marginInline: '0.5  rem',
                                }}>
                                {topic.split('>').pop()}
                            </span>
                        ))}
            </div>
        </div>
    );
};

export default Topics;
