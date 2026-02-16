import { create } from 'zustand';
import type { Phrase } from '../types';

interface RecognitionStore {
  isRecording: boolean;
  currentPhrase: Phrase | null;
  phraseHistory: Phrase[];
  formattedText: string;
  error: string | null;
  setIsRecording: (isRecording: boolean) => void;
  setCurrentPhrase: (phrase: Phrase | null) => void;
  addPhraseToHistory: (phrase: Phrase) => void;
  setFormattedText: (text: string) => void;
  setError: (error: string | null) => void;
  clearHistory: () => void;
}

export const useRecognitionStore = create<RecognitionStore>((set) => ({
  isRecording: false,
  currentPhrase: null,
  phraseHistory: [],
  formattedText: '',
  error: null,
  setIsRecording: (isRecording) => set({ isRecording }),
  setCurrentPhrase: (phrase) => set({ currentPhrase: phrase }),
  addPhraseToHistory: (phrase) =>
    set((state) => ({
      phraseHistory: [...state.phraseHistory, phrase],
    })),
  setFormattedText: (text) => set({ formattedText: text }),
  setError: (error) => set({ error }),
  clearHistory: () => set({ phraseHistory: [], currentPhrase: null, formattedText: '' }),
}));
