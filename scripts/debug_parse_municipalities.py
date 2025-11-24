import re
import csv

# Same function as in import script
def parse_municipalities(address, prefecture):
    """住所から市区町村を抽出"""
    if not address or not prefecture:
        return None

    # 都道府県名を除去
    address_without_pref = address.replace(prefecture, '')

    # 市区町村のパターンにマッチ
    patterns = [
        r'^([^市区町村]+[市区町村])',
        r'^([^郡]+郡[^町村]+[町村])',
    ]

    for pattern in patterns:
        match = re.match(pattern, address_without_pref)
        if match:
            return match.group(1)

    return None

# Test with error cases from the log
test_cases = [
    ("山形県村山市楯岡楯2-13", "山形県"),
    ("千葉県市川市相之川4-15-3友泉南行徳ビル3F", "千葉県"),
    ("千葉県市原市五井中央東2-6-1", "千葉県"),
    ("千葉県市川市八幡2-16-1はぐちビル2F", "千葉県"),
    ("東京都町田市本町田1173-1", "東京都"),
    ("東京都町田市原町田6-17-7町田サークビル6階", "東京都"),
    ("新潟県村上市北新保678", "新潟県"),
]

print("[v0] Testing parse_municipalities function:\n")

for address, prefecture in test_cases:
    result = parse_municipalities(address, prefecture)
    address_without_pref = address.replace(prefecture, '')
    print(f"Address: {address}")
    print(f"Prefecture: {prefecture}")
    print(f"After removing pref: '{address_without_pref}'")
    print(f"Result: {result}")
    print(f"Expected: Should extract the city/municipality")
    print("-" * 60)

# Now let's check actual CSV data
print("\n[v0] Checking actual CSV data:\n")

with open('/Users/tsukasa.okimori/aga-ed-pill-portal/aga_clinics.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    error_count = 0
    sample_count = 0

    for row in reader:
        address = row.get('住所', '')
        prefecture = row.get('都道府県', '')
        result = parse_municipalities(address, prefecture)

        if result is None and address and prefecture:
            error_count += 1
            if sample_count < 10:
                print(f"Record: {row.get('クリニック名', '')}")
                print(f"  Address: {address}")
                print(f"  Prefecture: {prefecture}")
                print(f"  Extracted: {result}")
                print()
                sample_count += 1

print(f"\n[v0] Total records with parse error: {error_count}")
