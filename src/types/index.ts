export type AnimationType = 'fade' | 'slide' | 'instant';

export type DisplayMode = 'deaf-only' | 'dual';

export interface RecognitionSettings {
  segmentationType: 'pause' | 'morphological';
  minCharacters: number;
  maxCharacters: number;
  silenceThreshold: number;
  kanjiAggressiveness: number;
}

export interface DisplaySettings {
  mainTextSize: number;
  formattedTextSize: number;
  showFormattedText: boolean;
  backgroundColor: string;
  animationType: AnimationType;
  animationDuration: number;
  historyCount: number;
}

export interface FormattingSettings {
  aiFormattingEnabled: boolean;
}

export interface AppSettings {
  recognition: RecognitionSettings;
  display: DisplaySettings;
  formatting: FormattingSettings;
}

export interface Phrase {
  id: string;
  text: string;
  timestamp: number;
}
