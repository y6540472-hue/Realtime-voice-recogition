import { useState } from 'react';
import { useRecognitionStore } from './store/recognitionStore';
import { useSettingsStore } from './store/settingsStore';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const { isRecording, currentPhrase, error } = useRecognitionStore();
  const { settings } = useSettingsStore();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-xl font-bold">リアルタイム会話支援アプリ</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ⚙️ 設定
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {error ? (
          <div className="text-red-500 text-center mb-4">
            <p className="text-lg">エラーが発生しました</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : null}

        {/* Current Phrase Display */}
        <div className="text-center mb-8">
          <p
            className="font-bold transition-all"
            style={{ fontSize: `${settings.display.mainTextSize}px` }}
          >
            {currentPhrase?.text || '話してください...'}
          </p>
        </div>

        {/* Recording Control */}
        <div className="flex gap-4">
          <button
            className={`w-16 h-16 rounded-full text-white font-bold ${
              isRecording ? 'bg-red-500' : 'bg-blue-500'
            }`}
          >
            {isRecording ? '■' : '●'}
          </button>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">設定</h2>
              <p className="text-gray-600">設定画面は開発中です...</p>
              <button
                onClick={() => setShowSettings(false)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-500 border-t">
        MVP版 - 開発中
      </footer>
    </div>
  );
}

export default App;
