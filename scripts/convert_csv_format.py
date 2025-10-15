import csv
import json

# Input and output file paths
input_file = '/Users/tsukasa.okimori/Library/CloudStorage/GoogleDrive-tsukasa.okimori@gmail.com/マイドライブ/clinics_rows.csv'
output_file = '/Users/tsukasa.okimori/Library/CloudStorage/GoogleDrive-tsukasa.okimori@gmail.com/マイドライブ/db-anycure-clinic-portal - raw_clinic.csv'

print(f"[v0] Reading from: {input_file}")
print(f"[v0] Writing to: {output_file}")

# Read input CSV
with open(input_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

print(f"[v0] Total rows to convert: {len(rows)}")

# Convert to target format
converted_rows = []
for i, row in enumerate(rows, start=1):
    try:
        # Parse JSON fields
        specialties = json.loads(row['specialties']) if row['specialties'] else []
        features = json.loads(row['features']) if row['features'] else []

        # Create station info from station, station_line, and distance
        station_info = ""
        if row['station'] and row['station'] != '-':
            station_parts = [row['station']]
            if row['station_line'] and row['station_line'] != '-':
                station_parts.append(row['station_line'])
            if row['distance'] and row['distance'] != '-':
                station_parts.append(row['distance'])
            station_info = " ".join(station_parts)
        else:
            station_info = "-"

        # Map to target format
        converted_row = {
            'no': i,
            'clinic_name': row['name'],
            'URL': row['website'] if row['website'] else '-',
            'prefecture': row['prefecture'],
            'municipalities': row['city'],
            'stations': station_info,
            'address': row['address'],
            'non-medical-response': ', '.join(features) if features else '-',
            'featured-subjects': ', '.join(specialties) if specialties else '-',
            'clinic_spec': row['description'] if row['description'] else '-',
            'corp_tel': row['phone'] if row['phone'] else '-'
        }

        converted_rows.append(converted_row)
    except Exception as e:
        print(f"[v0] Error converting row {i}: {e}")
        print(f"[v0] Row data: {row}")

print(f"[v0] Successfully converted: {len(converted_rows)} rows")

# Write output CSV
with open(output_file, 'w', encoding='utf-8', newline='') as f:
    fieldnames = ['no', 'clinic_name', 'URL', 'prefecture', 'municipalities', 'stations',
                  'address', 'non-medical-response', 'featured-subjects', 'clinic_spec', 'corp_tel']
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(converted_rows)

print(f"[v0] Conversion complete!")
print(f"[v0] Output file: {output_file}")
