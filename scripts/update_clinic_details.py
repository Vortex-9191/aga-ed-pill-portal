#!/usr/bin/env python3
"""
CSVからクリニック詳細データを更新するスクリプト
"""
import csv
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(project_root, '.env.local')
load_dotenv(env_path)

SUPABASE_URL = os.environ.get('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("[Error] SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# CSV file path
CSV_PATH = '/Users/tsukasa.okimori/aga-ed-pill-portal/aga_clinics.csv'

def update_clinic_details():
    print(f"[Info] Reading CSV: {CSV_PATH}")

    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        data = list(reader)

    print(f"[Info] Total records in CSV: {len(data)}")

    updated = 0
    not_found = 0
    errors = 0

    for row in data:
        clinic_name = row.get('クリニック名', '').strip()
        prefecture = row.get('都道府県', '').strip()

        if not clinic_name:
            continue

        # Find clinic by name and prefecture
        try:
            result = supabase.table('clinics').select('id').eq('clinic_name', clinic_name).eq('prefecture', prefecture).execute()

            if not result.data:
                not_found += 1
                continue

            clinic_id = result.data[0]['id']

            # Prepare update data
            update_data = {}

            # 営業時間
            if row.get('営業時間'):
                update_data['business_hours'] = row['営業時間']

            # カウンセリング料金
            if row.get('カウンセリング料金'):
                update_data['counseling_fee'] = row['カウンセリング料金']

            # 診察料
            if row.get('診察料'):
                update_data['consultation_fee'] = row['診察料']

            # 駐車場
            if row.get('駐車場'):
                update_data['parking'] = row['駐車場']

            # 支払い方法
            if row.get('支払い方法'):
                update_data['payment_methods'] = row['支払い方法']

            # スタッフ性別
            if row.get('スタッフ性別'):
                update_data['staff_gender'] = row['スタッフ性別']

            # 女性治療対応
            if row.get('女性治療対応'):
                update_data['female_treatment'] = row['女性治療対応']

            # 処方までの時間
            if row.get('処方までの時間'):
                update_data['prescription_time'] = row['処方までの時間']

            # おすすめポイント
            if row.get('おすすめポイント'):
                update_data['recommended_points'] = row['おすすめポイント']

            # コメント
            if row.get('コメント'):
                update_data['comment'] = row['コメント']

            # 電話番号（既存カラム更新）
            if row.get('電話番号'):
                update_data['corp_tel'] = row['電話番号']

            if update_data:
                supabase.table('clinics').update(update_data).eq('id', clinic_id).execute()
                updated += 1

                if updated % 100 == 0:
                    print(f"[Progress] Updated {updated} clinics...")

        except Exception as e:
            errors += 1
            print(f"[Error] {clinic_name}: {str(e)}")

    print(f"\n=== Summary ===")
    print(f"Total in CSV: {len(data)}")
    print(f"Updated: {updated}")
    print(f"Not found: {not_found}")
    print(f"Errors: {errors}")

if __name__ == '__main__':
    update_clinic_details()
