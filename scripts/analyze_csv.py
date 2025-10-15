import csv
import requests
from collections import Counter

# Fetch the CSV file
url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/db-anycure-clinic-portal%20-%20raw_clinic-58Uz0tajsMKW8zUljiRhuLInNhiHNa.csv"
response = requests.get(url)
response.encoding = 'utf-8'

# Parse CSV
lines = response.text.strip().split('\n')
reader = csv.DictReader(lines)
data = list(reader)

print(f"[v0] Total clinics: {len(data)}")
print(f"[v0] First 3 rows:")
for i, row in enumerate(data[:3]):
    print(f"\n[v0] Row {i+1}:")
    for key, value in row.items():
        print(f"  {key}: {value}")

# Analyze data
prefectures = Counter(row['prefecture'] for row in data)
municipalities = Counter(row['municipalities'] for row in data)
stations = Counter(row['stations'] for row in data)
specialties = []
for row in data:
    if row['featured-subjects']:
        specs = [s.strip() for s in row['featured-subjects'].split(',')]
        specialties.extend(specs)
specialty_counts = Counter(specialties)

print(f"\n[v0] Unique prefectures: {len(prefectures)}")
print(f"[v0] Top 5 prefectures: {prefectures.most_common(5)}")

print(f"\n[v0] Unique municipalities: {len(municipalities)}")
print(f"[v0] Top 5 municipalities: {municipalities.most_common(5)}")

print(f"\n[v0] Unique stations: {len(stations)}")
print(f"[v0] Top 5 stations: {stations.most_common(5)}")

print(f"\n[v0] Unique specialties: {len(specialty_counts)}")
print(f"[v0] Top 10 specialties: {specialty_counts.most_common(10)}")

# Check for missing data
print(f"\n[v0] Missing data analysis:")
for field in ['clinic_name', 'prefecture', 'municipalities', 'stations', 'address', 'featured-subjects']:
    missing = sum(1 for row in data if not row.get(field))
    print(f"  {field}: {missing} missing ({missing/len(data)*100:.1f}%)")
