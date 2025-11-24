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

# Get total count
result = supabase.table('clinics').select('*', count='exact').execute()

print(f"[v0] ✓ Total clinics in database: {result.count}")
print(f"[v0] ✓ Target was: 13,007 clinics")

if result.count > 0:
    success_rate = (result.count / 13007) * 100
    print(f"[v0] ✓ Import success rate: {success_rate:.1f}%")

    # Get a sample record
    sample = supabase.table('clinics').select('*').limit(1).execute()
    if sample.data:
        print(f"\n[v0] Sample record:")
        print(f"  - Clinic: {sample.data[0]['clinic_name']}")
        print(f"  - Prefecture: {sample.data[0]['prefecture']}")
        print(f"  - Municipalities: {sample.data[0]['municipalities']}")
        print(f"  - Spec: {sample.data[0]['clinic_spec']}")
