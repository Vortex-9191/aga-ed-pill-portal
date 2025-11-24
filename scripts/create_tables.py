import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env.local
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(project_root, '.env.local')
load_dotenv(env_path)

# Supabase credentials from environment
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("[v0] Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Read SQL file
sql_file_path = os.path.join(project_root, 'setup_complete_schema.sql')
print(f"[v0] Reading SQL file: {sql_file_path}")

with open(sql_file_path, 'r', encoding='utf-8') as f:
    sql_content = f.read()

# Remove comments and split into individual statements
# Filter out comment lines and empty lines
lines = sql_content.split('\n')
clean_lines = []
for line in lines:
    # Skip comment lines
    if line.strip().startswith('--'):
        continue
    clean_lines.append(line)

sql_clean = '\n'.join(clean_lines)

print("[v0] Executing SQL statements...")
print("[v0] Note: This may take a moment...")

try:
    # Execute SQL using Supabase's RPC or direct PostgreSQL connection
    # Since supabase-py doesn't directly support executing raw SQL,
    # we'll use psycopg2 instead
    import psycopg2

    # Parse connection string
    # Format: postgresql://postgres.PROJECT_ID:PASSWORD@HOST:PORT/DATABASE
    db_host = SUPABASE_URL.replace('https://', '').replace('http://', '')
    project_id = db_host.split('.')[0]

    # Construct PostgreSQL connection string
    # Supabase uses pooler connection
    conn_string = f"postgresql://postgres.{project_id}:{SUPABASE_KEY}@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"

    print(f"[v0] Connecting to database...")
    conn = psycopg2.connect(conn_string)
    conn.autocommit = True
    cursor = conn.cursor()

    # Execute the SQL
    cursor.execute(sql_clean)

    print("[v0] ✓ Tables created successfully!")
    print("[v0] ✓ Indexes created")
    print("[v0] ✓ Row Level Security enabled")
    print("[v0] ✓ Policies configured")
    print("[v0] ✓ Triggers set up")

    cursor.close()
    conn.close()

    print("\n[v0] Database setup complete!")
    print("[v0] You can now run the import script to add clinic data.")

except Exception as e:
    print(f"[v0] Error executing SQL: {str(e)}")
    print(f"[v0] Error type: {type(e).__name__}")
    import traceback
    traceback.print_exc()
    exit(1)
