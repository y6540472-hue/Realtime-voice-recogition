import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings } from '../types';

const defaultSettings: AppSettings = {
  recognition: {
    segmentationType: 'morphological',
    minCharacters: 1,
    maxCharacters: 30,
    silenceThreshold: 1000,
    kanjiAggressiveness: 5,
  },
  display: {
    mainTextSize: 60,
    formattedTextSize: 16,
    showFormattedText: true,
    backgroundColor: '#FFFFFF',
    animationType: 'slide',
    animationDuration: 0.3,
    historyCount: 2,
  },
  formatting: {
    aiFormattingEnabled: false,
  },
};

interface SettingsStore {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
            recognition: {
              ...state.settings.recognition,
              ...(newSettings.recognition || {}),
            },
            display: {
              ...state.settings.display,
              ...(newSettings.display || {}),
            },
            formatting: {
              ...state.settings.formatting,
              ...(newSettings.formatting || {}),
            },
          },
        })),
      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: 'app-settings',
    }
  )
);
