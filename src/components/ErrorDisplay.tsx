import { useRecognitionStore } from '../store/recognitionStore';

export const ErrorDisplay = () => {
  const { error, setError } = useRecognitionStore();

  if (!error) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4">
      <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <span className="text-3xl">⚠️</span>
          <div className="flex-1">
            <p className="text-lg font-bold text-red-900 mb-1">エラーが発生しました</p>
            <p className="text-base text-red-800">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-900 hover:text-red-700 text-2xl font-bold"
            aria-label="エラーを閉じる"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
