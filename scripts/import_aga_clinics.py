import csv
import os
import re
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env.local
# Get the parent directory (project root)
import sys
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(project_root, '.env.local')
load_dotenv(env_path)

# Supabase credentials from environment
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("[v0] Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
    print("[v0] Please set these environment variables before running this script")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Function to create slug from clinic name
def create_slug(clinic_name, index):
    """クリニック名からslugを生成"""
    # 日本語を除去し、英数字とハイフンのみに
    slug = re.sub(r'[^\w\s-]', '', clinic_name.lower())
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = slug.strip('-')

    # 日本語のみの場合は、indexを使用
    if not slug or not re.search(r'[a-z0-9]', slug):
        slug = f"clinic-{index}"

    return slug

# Function to parse municipalities from address
def parse_municipalities(address, prefecture):
    """住所から市区町村を抽出"""
    if not address or not prefecture:
        return None

    # 都道府県名を除去
    address_without_pref = address.replace(prefecture, '')

    # 市区町村のパターンにマッチ（修正版）
    patterns = [
        r'^(.+?[市])',           # ～市
        r'^(.+?[区])',           # ～区
        r'^(.+?郡.+?[町])',      # ～郡～町
        r'^(.+?郡.+?[村])',      # ～郡～村
        r'^(.+?[町])',           # ～町
        r'^(.+?[村])',           # ～村
    ]

    for pattern in patterns:
        match = re.match(pattern, address_without_pref)
        if match:
            return match.group(1)

    # マッチしない場合は空文字を返す（nullを避ける）
    return ""

# Read CSV file
csv_file = '/Users/tsukasa.okimori/aga-ed-pill-portal/aga_clinics.csv'
print(f"[v0] Reading CSV file: {csv_file}")

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    data = list(reader)

print(f"[v0] Total clinics to import: {len(data)}")

# Import data in batches
batch_size = 100
total_imported = 0
errors = []

for i in range(0, len(data), batch_size):
    batch = data[i:i+batch_size]
    records = []

    for idx, row in enumerate(batch, start=i+1):
        try:
            # 市区町村を抽出
            municipalities = parse_municipalities(row.get('住所', ''), row.get('都道府県', ''))

            # slugを生成
            slug = create_slug(row.get('クリニック名', ''), idx)

            # non_medical_responseを構築
            non_medical_parts = []
            if row.get('駐車場'):
                non_medical_parts.append(row['駐車場'])
            if row.get('支払い方法'):
                non_medical_parts.append(row['支払い方法'])
            non_medical_response = ', '.join(non_medical_parts) if non_medical_parts else None

            # 特徴を構築
            features_parts = []
            if row.get('特徴'):
                features_parts.append(row['特徴'])
            if row.get('スタッフ性別'):
                features_parts.append(f"スタッフ: {row['スタッフ性別']}")
            if row.get('女性治療対応'):
                features_parts.append(f"女性治療: {row['女性治療対応']}")
            if row.get('処方までの時間'):
                features_parts.append(row['処方までの時間'])
            features = ', '.join(features_parts) if features_parts else None

            # 備考を構築
            notes_parts = []
            if row.get('カウンセリング料金'):
                notes_parts.append(f"カウンセリング: {row['カウンセリング料金']}")
            if row.get('診察料'):
                notes_parts.append(f"診察料: {row['診察料']}")
            if row.get('おすすめポイント'):
                notes_parts.append(row['おすすめポイント'])
            if row.get('コメント'):
                notes_parts.append(row['コメント'])
            notes = '\n'.join(notes_parts) if notes_parts else None

            # Convert CSV row to database record
            record = {
                'no': idx,
                'clinic_name': row.get('クリニック名', ''),
                'slug': slug,
                'address': row.get('住所', ''),
                'prefecture': row.get('都道府県', ''),
                'municipalities': municipalities,
                'stations': row.get('最寄り駅') if row.get('最寄り駅') else None,
                'url': row.get('詳細URL') if row.get('詳細URL') else None,
                'featured_subjects': row.get('取扱治療薬') if row.get('取扱治療薬') else None,
                'clinic_spec': 'AGA治療',
                'corp_tel': row.get('電話番号') if row.get('電話番号') else None,
                'non_medical_response': non_medical_response,
                '特徴': features,
                '備考': notes,
            }

            records.append(record)
        except Exception as e:
            errors.append(f"Row {idx}: {str(e)}")
            print(f"[v0] Warning: Error processing row {idx}: {str(e)}")

    # Insert batch
    if records:
        try:
            result = supabase.table('clinics').insert(records).execute()
            total_imported += len(records)
            print(f"[v0] Imported batch {i//batch_size + 1}/{(len(data)-1)//batch_size + 1}: {len(records)} records (Total: {total_imported}/{len(data)})")
        except Exception as e:
            error_msg = f"Batch {i//batch_size + 1}: {str(e)}"
            print(f"[v0] Error importing batch {i//batch_size + 1}: {str(e)}")
            errors.append(error_msg)

print(f"\n[v0] Import complete!")
print(f"[v0] Total imported: {total_imported}")
print(f"[v0] Errors: {len(errors)}")

if errors:
    print("\n[v0] Error details:")
    for error in errors[:10]:  # Show first 10 errors
        print(f"  - {error}")
