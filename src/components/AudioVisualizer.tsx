import { useEffect, useRef, useState } from 'react';
import { useRecognitionStore } from '../store/recognitionStore';

export const AudioVisualizer = () => {
  const { isRecording } = useRecognitionStore();
  const [audioLevel, setAudioLevel] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!isRecording) {
      setAudioLevel(0);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    // マイク入力からオーディオレベルを取得
    const setupAudioContext = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 256;
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;

        // アニメーションループ
        const updateLevel = () => {
          if (!analyserRef.current || !dataArrayRef.current) return;

          const tempArray = new Uint8Array(dataArrayRef.current.length);
          analyserRef.current.getByteFrequencyData(tempArray);
          const average = tempArray.reduce((a, b) => a + b, 0) / tempArray.length;
          const normalizedLevel = average / 255; // 0-1の範囲に正規化

          setAudioLevel(normalizedLevel);
          animationFrameRef.current = requestAnimationFrame(updateLevel);
        };

        updateLevel();
      } catch (error) {
        console.error('Failed to setup audio visualizer:', error);
      }
    };

    setupAudioContext();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isRecording]);

  if (!isRecording) return null;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🎤</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-100 rounded-full"
            style={{
              width: `${audioLevel * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
