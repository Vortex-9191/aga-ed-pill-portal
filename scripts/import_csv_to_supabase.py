import csv
import requests
import os
import re
from supabase import create_client, Client

# Supabase credentials from environment
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("[v0] Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Fetch the CSV file
csv_url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/db-anycure-clinic-portal%20-%20raw_clinic-58Uz0tajsMKW8zUljiRhuLInNhiHNa.csv"
response = requests.get(csv_url)
response.encoding = 'utf-8'

# Parse CSV
lines = response.text.strip().split('\n')
reader = csv.DictReader(lines)
data = list(reader)

print(f"[v0] Total clinics to import: {len(data)}")

# Function to create slug from number only
def create_slug(no):
    return str(no)

# Import data in batches
batch_size = 100
total_imported = 0
errors = []

for i in range(0, len(data), batch_size):
    batch = data[i:i+batch_size]
    records = []
    
    for row in batch:
        try:
            # Convert CSV row to database record matching UI schema
            record = {
                'no': int(row['no']) if row['no'] else None,
                'clinic_name': row['clinic_name'],
                'slug': create_slug(row['no']),
                'address': row['address'],
                'prefecture': row['prefecture'],
                'municipalities': row['municipalities'],
                'stations': row['stations'] if row['stations'] and row['stations'] != '-' else None,
                'url': row['URL'] if row['URL'] and row['URL'] != '-' else None,
                'featured_subjects': row['featured-subjects'] if row['featured-subjects'] and row['featured-subjects'] != '-' else None,
                'clinic_spec': row['clinic_spec'] if row['clinic_spec'] and row['clinic_spec'] != '-' else None,
                'corp_tel': row['corp_tel'] if row['corp_tel'] and row['corp_tel'] != '-' else None,
                'non_medical_response': row['non-medical-response'] if row['non-medical-response'] and row['non-medical-response'] != '-' else None
            }
            records.append(record)
        except Exception as e:
            errors.append(f"Row {row.get('no', 'unknown')}: {str(e)}")
    
    # Insert batch
    try:
        result = supabase.table('clinics').insert(records).execute()
        total_imported += len(records)
        print(f"[v0] Imported batch {i//batch_size + 1}: {len(records)} records (Total: {total_imported})")
    except Exception as e:
        print(f"[v0] Error importing batch {i//batch_size + 1}: {str(e)}")
        errors.append(f"Batch {i//batch_size + 1}: {str(e)}")

print(f"\n[v0] Import complete!")
print(f"[v0] Total imported: {total_imported}")
print(f"[v0] Errors: {len(errors)}")

if errors:
    print("\n[v0] Error details:")
    for error in errors[:10]:  # Show first 10 errors
        print(f"  - {error}")
