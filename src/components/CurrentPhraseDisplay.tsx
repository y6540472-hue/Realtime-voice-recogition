import { useRecognitionStore } from '../store/recognitionStore';
import { useSettingsStore } from '../store/settingsStore';

export const CurrentPhraseDisplay = () => {
  const { currentPhrase } = useRecognitionStore();
  const { settings } = useSettingsStore();

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <p
        className="font-bold text-center transition-all duration-300"
        style={{
          fontSize: `${settings.display.mainTextSize}px`,
          lineHeight: 1.4,
        }}
      >
        {currentPhrase?.text || '話してください...'}
      </p>
    </div>
  );
};
