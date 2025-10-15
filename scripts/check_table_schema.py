import os
from supabase import create_client, Client

# Supabase credentials from environment
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY') or os.environ.get('SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("[v0] Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) must be set")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

print("[v0] Checking clinics table schema...")

# Try to get one record to see the structure
try:
    result = supabase.table('clinics').select('*').limit(1).execute()

    if result.data:
        print(f"[v0] Table exists with {len(result.data)} sample record(s)")
        print(f"[v0] Columns found:")
        for key in result.data[0].keys():
            print(f"  - {key}")
    else:
        print("[v0] Table is empty")
except Exception as e:
    print(f"[v0] Error: {e}")
