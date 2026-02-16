# CLAUDE.md

このファイルはClaude Codeによる開発のためのコンテキストを提供します。

## プロジェクト概要

リアルタイム会話支援アプリ - 聴者と難聴者の自然な会話を支援するWebアプリケーション

### コンセプト
「完璧な文字起こし」よりも「会話の流れ・テンポ」を優先し、聴者同士の会話と同じように「多少不正確でも、リアルタイムで伝わる」体験を提供する。

## 技術スタック

- **Frontend**: React 18+ + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Zustand (with persist middleware)
- **Speech Recognition**: Web Speech API
- **Morphological Analysis**: kuromoji.js
- **AI Formatting (Optional)**: Gemini Flash API

## プロジェクト構造

```
src/
├── components/      # Reactコンポーネント
├── hooks/          # カスタムフック
├── store/          # Zustand stores
│   ├── settingsStore.ts    # アプリ設定
│   └── recognitionStore.ts # 音声認識状態
├── services/       # 外部サービス連携
│   └── speechRecognition.ts
├── utils/          # ユーティリティ関数
├── types/          # TypeScript型定義
│   └── index.ts
└── App.tsx         # メインアプリケーション
```

## 開発規約

### ブランチ戦略
- GitHub Flow: `main` ← `feature/issue-X`

### コミット規約
- Conventional Commits形式を使用

### PR・マージ規約
- PR必須: mainへの直接push禁止
- Squash and Merge

### ドキュメント規約
- ドキュメントは最小限（CLAUDE.md、README.mdのみ）
- コード＝仕様
- IssueにDoDを明確に記載

### 禁止事項
- `docs/` 配下のmd大量生産

## 開発フェーズ

### フェーズ1: 基本実装 ✅ (進行中)
- [x] Webアプリの基本構造構築
- [x] プロジェクトセットアップ
- [ ] Web Speech API統合
- [ ] 一文節表示の実装
- [ ] 音声波形表示
- [ ] エラーハンドリング

### フェーズ2: 形態素解析・アニメーション
- [ ] kuromoji.js統合
- [ ] 3パターンのアニメーション実装
- [ ] パラメータ調整画面実装

### フェーズ3: 整形機能
- [ ] ルールベースの簡易整形実装
- [ ] Gemini API統合（検証用）
- [ ] 整形済みテキスト表示のON/OFF機能

### フェーズ4: UI/UX調整・チュートリアル
- [ ] デザイン調整（高齢者向けに最適化）
- [ ] 初回チュートリアル実装
- [ ] アクセシビリティ改善

### フェーズ5: 検証・改善
- [ ] ユーザーテスト
- [ ] パラメータ最適化
- [ ] パフォーマンス測定

## 設計原則

### アクセシビリティ優先
- 大きな文字サイズ（デフォルト60pt）
- 高コントラスト（白背景 + 黒文字）
- タップ領域を十分に確保（最小44px × 44px）
- わかりやすい日本語ラベル

### パフォーマンス目標
- 音声認識遅延: 500ms以内
- 形態素解析遅延: 100ms以内（目標）
- AI整形遅延: 1秒以内（非同期）
- アニメーション: 60fps

### プライバシー
- 録音データ・文字起こしテキストは保存しない
- 会話終了後にデータ削除

## API設定

### Gemini API (オプション)
環境変数 `.env` に以下を設定:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

## ビルド・デプロイ

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 参考資料

詳細な要件定義は別途管理されています。
