import os
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

print("[v0] Checking database schema...")

# Fetch a sample record to see what columns exist
try:
    response = supabase.table('clinics').select('*').limit(1).execute()

    if response.data and len(response.data) > 0:
        sample = response.data[0]
        columns = list(sample.keys())

        print(f"\n[v0] Found {len(columns)} columns in 'clinics' table:")
        print("=" * 50)

        # Check for enrichment columns
        enrichment_columns = [
            '院長名', 'access_info', 'ホームページ',
            '口コミ評価', '口コミ件数',
            '休診日', '備考',
            '専門医', '対応可能な疾患', '専門的な治療', '特徴',
            '月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '日曜', '祝'
        ]

        existing = []
        missing = []

        for col in enrichment_columns:
            if col in columns:
                existing.append(col)
            else:
                missing.append(col)

        print(f"\n✅ Existing enrichment columns ({len(existing)}):")
        for col in existing:
            print(f"  - {col}")

        if missing:
            print(f"\n❌ Missing enrichment columns ({len(missing)}):")
            for col in missing:
                print(f"  - {col}")
            print("\n[v0] ⚠️  You need to run add_columns.sql first!")
        else:
            print("\n✅ All enrichment columns exist! Ready to run enrichment script.")

        # Show all columns
        print(f"\n[v0] All columns:")
        for col in sorted(columns):
            print(f"  - {col}")

    else:
        print("[v0] No data found in clinics table")

except Exception as e:
    print(f"[v0] Error checking schema: {str(e)}")
