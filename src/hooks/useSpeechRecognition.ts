import { useEffect, useRef, useCallback } from 'react';
import { SpeechRecognitionService } from '../services/speechRecognition';
import { useRecognitionStore } from '../store/recognitionStore';
import type { Phrase } from '../types';

export const useSpeechRecognition = () => {
  const recognitionServiceRef = useRef<SpeechRecognitionService | null>(null);
  const { isRecording, setIsRecording, setCurrentPhrase, addPhraseToHistory, setError } =
    useRecognitionStore();

  // 音声認識サービスの初期化
  useEffect(() => {
    recognitionServiceRef.current = new SpeechRecognitionService();

    const service = recognitionServiceRef.current;

    // ブラウザ対応チェック
    if (!service.isSupported()) {
      setError(
        'このブラウザは音声認識に対応していません。Safariまたはchromeをお使いください。'
      );
      return;
    }

    // 音声認識結果を受け取るコールバック
    service.onResult((text: string, isFinal: boolean) => {
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
      // 録音中だった場合は自動的に再起動
      if (isRecording) {
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
      if (recognitionServiceRef.current) {
        recognitionServiceRef.current.stop();
      }
    };
  }, [isRecording, setIsRecording, setCurrentPhrase, addPhraseToHistory, setError]);

  // 録音開始
  const startRecording = useCallback(() => {
    if (!recognitionServiceRef.current) {
      setError('音声認識サービスが初期化されていません');
      return;
    }

    setError(null);
    setIsRecording(true);
    recognitionServiceRef.current.start();
  }, [setIsRecording, setError]);

  // 録音停止
  const stopRecording = useCallback(() => {
    if (!recognitionServiceRef.current) {
      return;
    }

    setIsRecording(false);
    recognitionServiceRef.current.stop();
  }, [setIsRecording]);

  return {
    isRecording,
    startRecording,
    stopRecording,
  };
};
