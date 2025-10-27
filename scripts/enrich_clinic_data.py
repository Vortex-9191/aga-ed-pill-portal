import pandas as pd
import os
import re
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv('.env.local')

# Supabase credentials from environment
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("[v0] Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def normalize_phone(phone):
    """電話番号を正規化（数字のみに統一）"""
    if pd.isna(phone):
        return ''
    return re.sub(r'[^0-9]', '', str(phone))

def parse_rating(rating_str):
    """口コミ評価を数値に変換"""
    if pd.isna(rating_str) or rating_str == '':
        return None
    try:
        return float(rating_str)
    except:
        return None

def parse_review_count(count_str):
    """口コミ件数を整数に変換"""
    if pd.isna(count_str) or count_str == '':
        return None
    try:
        return int(count_str)
    except:
        return None

print("[v0] Loading merged CSV data...")
merged_df = pd.read_csv('/Users/tsukasa.okimori/Desktop/merged_clinic_data.csv')

# Filter only matched records (both in clinic_data_v2 and raw_clinic)
matched_df = merged_df[merged_df['_merge'] == 'both'].copy()
print(f"[v0] Found {len(matched_df)} matched clinics to enrich")

# Fetch all clinics from Supabase
print("[v0] Fetching existing clinics from Supabase...")
response = supabase.table('clinics').select('id, corp_tel, clinic_name').execute()
existing_clinics = response.data
print(f"[v0] Found {len(existing_clinics)} existing clinics in database")

# Create a mapping of normalized phone -> clinic id
phone_to_id = {}
for clinic in existing_clinics:
    if clinic['corp_tel']:
        normalized = normalize_phone(clinic['corp_tel'])
        if normalized:
            phone_to_id[normalized] = clinic['id']

print(f"[v0] Created phone mapping for {len(phone_to_id)} clinics")

# Prepare update records
updates = []
matched_count = 0
skipped_count = 0

for idx, row in matched_df.iterrows():
    # Get normalized phone from the matched data
    phone_normalized = row['電話番号_normalized']

    if not phone_normalized or phone_normalized not in phone_to_id:
        skipped_count += 1
        continue

    clinic_id = phone_to_id[phone_normalized]

    # Prepare update data with enriched information
    update_data = {
        'id': clinic_id,
    }

    # Add enriched fields from clinic_data_v2
    if pd.notna(row['院長名']) and row['院長名'] != '':
        update_data['院長名'] = str(row['院長名'])

    if pd.notna(row['アクセス']) and row['アクセス'] != '':
        update_data['access_info'] = str(row['アクセス'])

    if pd.notna(row['ホームページ']) and row['ホームページ'] != '':
        update_data['ホームページ'] = str(row['ホームページ'])

    # 口コミ情報
    rating = parse_rating(row['口コミ評価'])
    if rating is not None:
        update_data['口コミ評価'] = rating

    review_count = parse_review_count(row['口コミ件数'])
    if review_count is not None:
        update_data['口コミ件数'] = review_count

    # 運営情報
    if pd.notna(row['休診日']) and row['休診日'] != '':
        update_data['休診日'] = str(row['休診日'])

    if pd.notna(row['備考']) and row['備考'] != '':
        update_data['備考'] = str(row['備考'])

    # 専門情報
    if pd.notna(row['専門医']) and row['専門医'] != '':
        update_data['専門医'] = str(row['専門医'])

    if pd.notna(row['対応可能な疾患']) and row['対応可能な疾患'] != '':
        update_data['対応可能な疾患'] = str(row['対応可能な疾患'])

    if pd.notna(row['専門的な治療']) and row['専門的な治療'] != '':
        update_data['専門的な治療'] = str(row['専門的な治療'])

    if pd.notna(row['特徴']) and row['特徴'] != '':
        update_data['特徴'] = str(row['特徴'])

    # 診療時間（曜日別）
    weekdays = ['月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜', '祝']
    for day in weekdays:
        if pd.notna(row[day]) and row[day] != '' and row[day] != '-':
            update_data[day] = str(row[day])

    # Only add if we have data to update
    if len(update_data) > 1:  # More than just 'id'
        updates.append(update_data)
        matched_count += 1

print(f"\n[v0] Prepared {matched_count} clinics for update")
print(f"[v0] Skipped {skipped_count} clinics (no phone match)")

# Update in batches
batch_size = 100
total_updated = 0
errors = []

for i in range(0, len(updates), batch_size):
    batch = updates[i:i+batch_size]

    try:
        # Upsert batch (insert or update)
        result = supabase.table('clinics').upsert(batch).execute()
        total_updated += len(batch)
        print(f"[v0] Updated batch {i//batch_size + 1}/{(len(updates)-1)//batch_size + 1}: {len(batch)} records (Total: {total_updated}/{len(updates)})")
    except Exception as e:
        error_msg = f"Batch {i//batch_size + 1}: {str(e)}"
        print(f"[v0] Error: {error_msg}")
        errors.append(error_msg)

print(f"\n[v0] Enrichment complete!")
print(f"[v0] Total updated: {total_updated}")
print(f"[v0] Errors: {len(errors)}")

if errors:
    print("\n[v0] Error details:")
    for error in errors[:10]:  # Show first 10 errors
        print(f"  - {error}")

# Generate summary report
print("\n[v0] === Summary Report ===")
print(f"Total clinics in merged CSV: {len(merged_df)}")
print(f"Matched clinics (both sources): {len(matched_df)}")
print(f"Clinics in Supabase: {len(existing_clinics)}")
print(f"Phone matches found: {matched_count}")
print(f"Successfully updated: {total_updated}")
print(f"Update rate: {total_updated/len(existing_clinics)*100:.1f}%")
