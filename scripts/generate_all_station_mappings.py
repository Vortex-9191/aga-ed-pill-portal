#!/usr/bin/env python3
"""
Generate comprehensive station mappings from Supabase database
"""
from supabase import create_client
from collections import Counter
import re

url = "https://seyoiaohgevmxfsjgbvu.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNleW9pYW9oZ2V2bXhmc2pnYnZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTUxNTMsImV4cCI6MjA3NjAzMTE1M30.WfRhErkpDDgMeMuUabvuw_lV5EUQkxqoQ-O26h-hhAU"

supabase = create_client(url, key)

# Fetch all clinics with pagination
all_clinics = []
offset = 0
limit = 1000

while True:
    response = supabase.table("clinics").select("stations, prefecture").range(offset, offset + limit - 1).execute()
    if not response.data:
        break
    all_clinics.extend(response.data)
    offset += limit
    if len(response.data) < limit:
        break

print(f"Total clinics fetched: {len(all_clinics)}")

# Parse and count stations
stations_count = Counter()
station_prefecture = {}

for clinic in all_clinics:
    stations_str = clinic.get('stations')
    prefecture = clinic.get('prefecture', '不明')

    if not stations_str or stations_str.strip() == '' or stations_str == '不明':
        continue

    # Split by various separators
    # Replace full-width with half-width
    stations_str = stations_str.replace('、', ',').replace('・', ',')
    parts = [p.strip() for p in stations_str.split(',')]

    for part in parts:
        if not part or part == '不明':
            continue

        # Clean up station name
        station = part.strip()

        # Skip if too short or looks like an address
        if len(station) < 2:
            continue

        stations_count[station] += 1
        if station not in station_prefecture:
            station_prefecture[station] = prefecture

print(f"Total unique stations: {len(stations_count)}")

# Generate slugs
def romanize_simple(text):
    """Simple slug generation"""
    # Remove 駅 suffix
    text = text.replace('駅', '').strip()

    # Replace special characters
    text = text.replace('〈', '').replace('〉', '').replace('（', '').replace('）', '')
    text = text.replace('ケ', 'ke').replace('ヶ', 'ga').replace('ッ', '')
    text = text.lower()

    # Simple romanization map
    kana_map = {
        'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
        'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
        'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
        'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
        'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
        'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
        'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
        'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
        'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
        'わ': 'wa', 'を': 'wo', 'ん': 'n',
    }

    result = ''
    for char in text:
        if char in kana_map:
            result += kana_map[char]
        elif char.isascii():
            result += char

    # If romanization failed, use hash
    if not result or len(result) < 2:
        import hashlib
        hash_val = hashlib.md5(text.encode()).hexdigest()[:8]
        result = f"st{hash_val}"

    return result.replace(' ', '').replace('-', '')

# Print TypeScript mappings for all stations
print("\n// TypeScript station mappings:")
print("export const stationMap: Record<string, { ja: string; prefecture: string; lines: string[] }> = {")

# Sort by count descending
sorted_stations = sorted(stations_count.items(), key=lambda x: x[1], reverse=True)

used_slugs = set()
for station, count in sorted_stations:
    if count < 2:  # Skip stations with only 1 clinic
        continue

    pref = station_prefecture.get(station, '不明')
    slug = romanize_simple(station)

    # Ensure unique slug
    original_slug = slug
    counter = 1
    while slug in used_slugs:
        slug = f"{original_slug}{counter}"
        counter += 1
    used_slugs.add(slug)

    # Add 駅 suffix if not present
    station_display = station if station.endswith('駅') else f"{station}駅"

    print(f'  {slug}: {{ ja: "{station_display}", prefecture: "{pref}", lines: [] }},')

print("}")
print(f"\nTotal stations mapped: {len([s for s, c in sorted_stations if c >= 2])}")
