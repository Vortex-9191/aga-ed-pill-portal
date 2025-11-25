# Vercel環境変数セットアップガイド

## 必要な情報

すでに取得済み:
- ✅ Supabase URL: `https://xpodwpaozumpdvayyrfu.supabase.co`
- ✅ Supabase Anon Key: 自動設定済み
- ✅ ローカル環境ファイル (`.env.local`) 作成済み

## Vercel環境変数の設定方法

### 方法1: Vercel CLI (推奨)

1. Vercelトークンを取得:
   - https://vercel.com/account/tokens にアクセス
   - "Create Token"をクリック
   - トークンをコピー

2. 以下のコマンドを実行:

```bash
export VERCEL_TOKEN="your-token-here"  # 取得したトークンに置き換え
./setup-vercel-cli-with-token.sh
```

### 方法2: Vercel API

1. Vercelトークンとプロジェクト IDを取得:
   - トークン: https://vercel.com/account/tokens
   - プロジェクトID: https://vercel.com/vortex-9191s-projects/aga-portal/settings

2. 以下のコマンドを実行:

```bash
export VERCEL_TOKEN="your-token-here"
export VERCEL_PROJECT_ID="your-project-id"
./setup-vercel-api.sh
```

### 方法3: Vercel Dashboard (手動)

1. https://vercel.com/vortex-9191s-projects/aga-portal/settings/environment-variables にアクセス

2. 以下の環境変数を追加 (Production, Preview, Development すべてにチェック):

   **NEXT_PUBLIC_SUPABASE_URL**
   ```
   https://xpodwpaozumpdvayyrfu.supabase.co
   ```

   **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwb2R3cGFvenVtcGR2YXl5cmZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwMzY5MDQsImV4cCI6MjA3NzYxMjkwNH0.SsoEJ9ckftY-YNfYUGOXg7jSR-P-IFKh2q12YSb7ybs
   ```

3. 再デプロイをトリガー:
   - Deploymentsタブから最新のデプロイメントを選択
   - "Redeploy"ボタンをクリック

## 設定後の確認

環境変数設定後、アプリケーションが正しく動作することを確認:
- ✅ クリニック一覧が表示される
- ✅ フォントが正しく適用される (ヒラギノ角ゴシック)
- ✅ 都道府県別のクリニック数が表示される

## ローカル開発環境

ローカル環境は既に設定済みです:
- `.env.local` ファイルが作成されています
- `npm run dev` でローカルサーバーを起動できます
