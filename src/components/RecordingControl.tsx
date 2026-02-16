import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

export const RecordingControl = () => {
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition();

  const handleToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleToggle}
        className={`w-20 h-20 rounded-full text-white text-3xl font-bold transition-all duration-200 shadow-lg hover:scale-105 active:scale-95 ${
          isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        aria-label={isRecording ? '録音停止' : '録音開始'}
      >
        {isRecording ? '■' : '●'}
      </button>
      <p className="text-sm text-gray-600">
        {isRecording ? '録音中...' : '丸いボタンを押して開始'}
      </p>
    </div>
  );
};
