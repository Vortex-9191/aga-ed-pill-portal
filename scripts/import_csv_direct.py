import os
import csv
import requests
from io import StringIO

# CSV URL
CSV_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/db-anycure-clinic-portal%20-%20raw_clinic-sZ3SsxZ3S1AYQI7yJGezs0Kj4YXrjA.csv"

# Supabase credentials from environment
SUPABASE_URL = os.environ.get('SUPABASE_URL')
SUPABASE_SERVICE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

print(f"[v0] Fetching CSV from {CSV_URL}")

# Fetch CSV data
response = requests.get(CSV_URL)
response.raise_for_status()
csv_content = response.text

print(f"[v0] CSV fetched successfully, size: {len(csv_content)} bytes")

# Parse CSV
csv_reader = csv.DictReader(StringIO(csv_content))
rows = list(csv_reader)

print(f"[v0] Parsed {len(rows)} rows from CSV")
print(f"[v0] Sample row: {rows[0] if rows else 'No rows'}")

# Transform data to match database schema
clinics_data = []
for row in rows:
    # Parse specialties from comma-separated string
    specialties_str = row.get('featured-subjects', '')
    specialties = [s.strip() for s in specialties_str.split(',') if s.strip()]
    
    clinic = {
        'name': row.get('clinic_name', ''),
        'website': row.get('URL', ''),
        'prefecture': row.get('prefecture', ''),
        'city': row.get('municipalities', ''),
        'station': row.get('stations', ''),
        'address': row.get('address', ''),
        'specialties': specialties,
        'phone': row.get('corp_tel', ''),
        'rating': 0.0,  # Default rating
        'review_count': 0,  # Default review count
        'image_url': '/placeholder.svg?height=200&width=300',  # Default image
    }
    clinics_data.append(clinic)

print(f"[v0] Transformed {len(clinics_data)} clinic records")
print(f"[v0] Sample transformed record: {clinics_data[0] if clinics_data else 'No data'}")

# Insert data into Supabase in batches
BATCH_SIZE = 100
headers = {
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': f'Bearer {SUPABASE_SERVICE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
}

supabase_api_url = f"{SUPABASE_URL}/rest/v1/clinics"

total_inserted = 0
for i in range(0, len(clinics_data), BATCH_SIZE):
    batch = clinics_data[i:i + BATCH_SIZE]
    
    print(f"[v0] Inserting batch {i//BATCH_SIZE + 1} ({len(batch)} records)...")
    
    response = requests.post(
        supabase_api_url,
        json=batch,
        headers=headers
    )
    
    if response.status_code in [200, 201]:
        total_inserted += len(batch)
        print(f"[v0] Batch inserted successfully. Total: {total_inserted}/{len(clinics_data)}")
    else:
        print(f"[v0] Error inserting batch: {response.status_code}")
        print(f"[v0] Response: {response.text}")
        break

print(f"[v0] Import complete! Total records inserted: {total_inserted}")
