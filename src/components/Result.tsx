import Highlighted from './Highlighted';
import Topics from './Topics';
import Speakers from './Speakers';
import type { SentimentAnalysisResults, Transcript } from './AudioRecorder';

const Result = ({ transcript }: { transcript: Transcript }) => {
  return (
    <div>
      <p>
        {transcript.sentiment_analysis_results?.map((result: SentimentAnalysisResults) => (
          <Highlighted
            key={result.confidence}
            text={result.text}
            sentiment={result.sentiment}
            entities={transcript.entities || []}
          />
        ))}
      </p>
      <Speakers transcript={transcript} />
      <Topics transcript={transcript} />
    </div>
  );
};

export default Result;
