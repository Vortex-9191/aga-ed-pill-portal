import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(project_root, '.env.local')
load_dotenv(env_path)

SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

print("[v0] Checking current record count...")
result = supabase.table('clinics').select('*', count='exact').execute()
print(f"[v0] Current records: {result.count}")

print("[v0] Deleting all records...")
# Delete all records
delete_result = supabase.table('clinics').delete().neq('id', '00000000-0000-0000-0000-000000000000').execute()

print("[v0] ✓ All records deleted")

# Verify
verify = supabase.table('clinics').select('*', count='exact').execute()
print(f"[v0] ✓ Records after deletion: {verify.count}")
