# リアルタイム会話支援アプリ

聴者と難聴者の自然な会話を支援するWebアプリケーション（MVP版）

## コンセプト

「完璧な文字起こし」よりも「会話の流れ・テンポ」を優先。
聴者同士の会話と同じように「多少不正確でも、リアルタイムで伝わる」体験を提供します。

## 主な機能

- リアルタイム音声認識（Web Speech API）
- 一文節ごとの表示
- 形態素解析による自然な区切り（kuromoji.js）
- 3パターンのアニメーション（フェード/スライド/瞬時）
- AI整形機能（Gemini API、オプション）
- 高齢者向けの大きな文字・わかりやすいUI

## 技術スタック

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Zustand
- Web Speech API
- kuromoji.js
- Gemini Flash API（オプション）

## 開発

```bash
# インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 環境変数

Gemini API（AI整形機能）を使用する場合は `.env` ファイルを作成:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

## ブラウザ対応

- iOS Safari（推奨）
- Chrome

**注意**: Web Speech APIはブラウザによって対応状況が異なります。

## 開発規約

- **ブランチ戦略**: GitHub Flow (`main` ← `feature/issue-X`)
- **コミット**: Conventional Commits
- **PR**: 必須、Squash and Merge
- **ドキュメント**: 最小限（CLAUDE.md、README.mdのみ）

## ライセンス

個人開発プロジェクト
