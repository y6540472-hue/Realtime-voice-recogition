import { useRecognitionStore } from '../store/recognitionStore';

export const AudioVisualizer = () => {
  const { isRecording } = useRecognitionStore();

  if (!isRecording) return null;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎤</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          {/* 録音中アニメーション - パルスエフェクト */}
          <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '100%' }} />
        </div>
        <span className="text-xs text-gray-500">録音中</span>
      </div>
    </div>
  );
};
