
export interface Entities {
  entity_type: string;
  text: string;
  start?: number;
  end?: number;
}
export interface Words {
  text: string;
  start: number;
  end: number;
  confidence: number;
  speaker: string;
}
export interface Utterance {
  confidence: number;
  end: number;
  speaker: string;
  start: number;
  text: string;
  words: Words[];
}
export interface SentimentAnalysisResults {
  confidence: number;
  text: string;
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
}

export interface Label {
  relevance: number;
  label: string;
}

export interface Result {
  text: string;
  labels: Label[];
  timestamp: {
    start: number;
    end: number;
  };
}

export interface Summary {
  topic: number;
}

export interface IabCategoriesResult {
  status: 'success' | 'unavailable';
  results: Result[];
  summary: Summary;
} 
export interface StatusProps {
  isLoading: boolean;
  status: string;
}


export interface Transcript {
  id: string;
  status?: 'processing' | 'queued' | 'completed' | 'error';
  text?: string;
  sentiment_analysis_results?: SentimentAnalysisResults[];
  entities?: Entities[];
  utterances?: Utterance[];
  iab_categories_result?: IabCategoriesResult;
}
