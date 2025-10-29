# データベーススクリプト

## clinic_countsテーブルの設定

### 概要
`clinic_counts`テーブルは、クリニック件数を事前に集計して保存し、パフォーマンスを向上させるためのテーブルです。

### 利点
1. **高速なクエリ**: 毎回集計する必要がなく、事前に計算された件数を取得
2. **スケーラビリティ**: clinicsテーブルのサイズが大きくなっても、クエリ速度は維持される
3. **自動更新**: トリガーにより、clinicsテーブルの変更時に自動的にカウントが更新される

### セットアップ手順

#### 1. Supabaseダッシュボードにアクセス
1. https://supabase.com にログイン
2. プロジェクトを選択
3. 左サイドバーから「SQL Editor」をクリック

#### 2. スクリプトの実行
1. 「New Query」をクリック
2. `scripts/create_clinic_counts_table.sql` の内容をコピー&ペースト
3. 「Run」をクリックして実行

#### 3. 実行結果の確認
スクリプトが正常に実行されると、以下の情報が表示されます：
```
count_type    | total_entries | total_clinics
--------------+---------------+--------------
municipality  | 1234          | 5678
prefecture    | 47            | 5678
station       | 567           | 3456
```

### テーブル構造

```sql
CREATE TABLE clinic_counts (
  id SERIAL PRIMARY KEY,
  count_type TEXT NOT NULL,        -- 'prefecture', 'municipality', 'station'
  prefecture TEXT,                  -- 都道府県名
  municipality TEXT,                -- 市区町村名
  station TEXT,                     -- 駅名
  clinic_count INTEGER NOT NULL,    -- クリニック件数
  updated_at TIMESTAMP DEFAULT NOW() -- 最終更新日時
);
```

### 使用例

#### 市区町村別の件数を取得
```typescript
const { data } = await supabase
  .from("clinic_counts")
  .select("prefecture, municipality, clinic_count")
  .eq("count_type", "municipality")
  .not("prefecture", "is", null)
  .not("municipality", "is", null)
```

#### 都道府県別の件数を取得
```typescript
const { data } = await supabase
  .from("clinic_counts")
  .select("prefecture, clinic_count")
  .eq("count_type", "prefecture")
```

#### 駅別の件数を取得
```typescript
const { data } = await supabase
  .from("clinic_counts")
  .select("station, clinic_count")
  .eq("count_type", "station")
  .order("clinic_count", { ascending: false })
  .limit(10)
```

### 手動更新

通常はトリガーにより自動更新されますが、必要に応じて手動で更新することも可能です：

```sql
SELECT refresh_all_clinic_counts();
```

### トラブルシューティング

#### エラー: relation "clinic_counts" does not exist
→ スクリプトがまだ実行されていません。上記の「セットアップ手順」を実行してください。

#### エラー: permission denied
→ Supabaseダッシュボードで実行するか、適切な権限を持つユーザーで実行してください。

#### カウントが更新されない
1. トリガーが正しく設定されているか確認:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'refresh_counts_trigger';
```

2. 手動で更新:
```sql
SELECT refresh_all_clinic_counts();
```

### パフォーマンス

- **更新頻度**: clinicsテーブルの変更時に自動更新
- **クエリ速度**: 通常のクエリの10-100倍高速
- **メンテナンス**: 不要（自動管理）
