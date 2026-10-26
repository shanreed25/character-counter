
export interface TextInputProps {
  onTextChange: (text: string) => void;
  placeholder?: string;
  initialValue?: string;
  maxLength?: number; // for the character limit stop
}


export interface TextStats {
  characterCount: number;
  wordCount: number;
  readingTime: number; // in minutes
}
 
export interface StatsDisplayProps {
  stats: TextStats;
  showReadingTime?: boolean;
  //word count and targetReadingTime needs to be in StatsDisplay, 
  // but minWords, maxWords and targetReadingTime are
  // in CharacterCounter adding minWords, maxWords and targetReadingTime
  // here will let me pass them down from CharacterCounter to StatsDisplay
  minWords?: number; 
  maxWords?: number;
  targetReadingTime?: number;
}


export interface CharacterCounterProps {
  minWords?: number;
  maxWords?: number;
  targetReadingTime?: number; // in minutes
}