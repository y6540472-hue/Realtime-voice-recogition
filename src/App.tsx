import { useState } from 'react';
import { CurrentPhraseDisplay } from './components/CurrentPhraseDisplay';
import { RecordingControl } from './components/RecordingControl';
import { AudioVisualizer } from './components/AudioVisualizer';
import { ErrorDisplay } from './components/ErrorDisplay';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Error Display */}
      <ErrorDisplay />

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
      <main className="flex-1 flex flex-col">
        {/* Current Phrase Display */}
        <CurrentPhraseDisplay />

        {/* Audio Visualizer */}
        <div className="pb-4">
          <AudioVisualizer />
        </div>

        {/* Recording Control */}
        <div className="pb-8">
          <RecordingControl />
        </div>
      </main>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
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

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-500 border-t">
        MVP版 - 開発中
      </footer>
    </div>
  );
}

export default App;
