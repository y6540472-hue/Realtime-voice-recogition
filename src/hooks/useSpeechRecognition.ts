import { useEffect, useRef, useCallback } from 'react';
import { SpeechRecognitionService } from '../services/speechRecognition';
import { useRecognitionStore } from '../store/recognitionStore';
import type { Phrase } from '../types';

export const useSpeechRecognition = () => {
  const recognitionServiceRef = useRef<SpeechRecognitionService | null>(null);
  const isRecordingRef = useRef(false);
  const { isRecording, setIsRecording, setCurrentPhrase, addPhraseToHistory, setError } =
    useRecognitionStore();

  // isRecordingの値をrefに同期
  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  // 音声認識サービスの初期化（マウント時のみ）
  useEffect(() => {
    console.log('Initializing speech recognition service...');
    recognitionServiceRef.current = new SpeechRecognitionService();

    const service = recognitionServiceRef.current;

    // ブラウザ対応チェック
    if (!service.isSupported()) {
      console.error('Speech recognition not supported');
      setError(
        'このブラウザは音声認識に対応していません。Safariまたはchromeをお使いください。'
      );
      return;
    }

    console.log('Speech recognition service initialized');

    // 音声認識結果を受け取るコールバック
    service.onResult((text: string, isFinal: boolean) => {
      console.log('Recognition result:', text, 'isFinal:', isFinal);
      const phrase: Phrase = {
        id: `${Date.now()}-${Math.random()}`,
        text,
        timestamp: Date.now(),
      };

      if (isFinal) {
        // 確定した結果は履歴に追加
        addPhraseToHistory(phrase);
        setCurrentPhrase(null);
      } else {
        // 途中結果は現在のフレーズとして表示
        setCurrentPhrase(phrase);
      }
    });

    // エラーハンドリング
    service.onError((error: string) => {
      console.error('Speech recognition error:', error);

      // エラーメッセージを高齢者にもわかりやすく変換
      let userFriendlyError = '';
      switch (error) {
        case 'not-allowed':
        case 'permission-denied':
          userFriendlyError = 'マイクをオンにしてください';
          break;
        case 'no-speech':
          userFriendlyError = '声が聞こえませんでした。もう一度話してください';
          break;
        case 'network':
          userFriendlyError = 'インターネットに接続してください';
          break;
        case 'aborted':
          // ユーザーが停止した場合はエラー表示しない
          break;
        default:
          userFriendlyError = 'エラーが発生しました。もう一度お試しください';
      }

      if (userFriendlyError) {
        setError(userFriendlyError);
      }
      setIsRecording(false);
    });

    // 認識終了時（自動再起動）
    service.onEnd(() => {
      console.log('Recognition ended, isRecording:', isRecordingRef.current);
      // 録音中だった場合は自動的に再起動
      if (isRecordingRef.current) {
        console.log('Auto-restarting recognition...');
        setTimeout(() => {
          try {
            service.start();
          } catch (err) {
            console.error('Failed to restart recognition:', err);
            setIsRecording(false);
          }
        }, 100);
      }
    });

    return () => {
      console.log('Cleaning up speech recognition service');
      if (recognitionServiceRef.current) {
        recognitionServiceRef.current.stop();
      }
    };
  }, [setIsRecording, setCurrentPhrase, addPhraseToHistory, setError]);

  // 録音開始
  const startRecording = useCallback(() => {
    console.log('startRecording called');
    if (!recognitionServiceRef.current) {
      console.error('Recognition service not initialized');
      setError('音声認識サービスが初期化されていません');
      return;
    }

    console.log('Starting recognition...');
    setError(null);
    setIsRecording(true);
    recognitionServiceRef.current.start();
  }, [setIsRecording, setError]);

  // 録音停止
  const stopRecording = useCallback(() => {
    console.log('stopRecording called');
    if (!recognitionServiceRef.current) {
      return;
    }

    console.log('Stopping recognition...');
    setIsRecording(false);
    recognitionServiceRef.current.stop();
  }, [setIsRecording]);

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};
