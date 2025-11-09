#!/usr/bin/env python3
"""
Parse Apple Health export.xml and extract weight data
Usage: python parse_health_data.py /path/to/export.xml
"""

import xml.etree.ElementTree as ET
import json
import csv
from datetime import datetime
from collections import defaultdict
import sys


def parse_weight_data(xml_file):
    """Extract weight data from Apple Health export XML"""
    print(f"📂 Parsing {xml_file}...")
    
    tree = ET.parse(xml_file)
    root = tree.getroot()
    
    # Find all weight records
    # Type: HKQuantityTypeIdentifierBodyMass
    weight_records = []
    
    for record in root.findall('.//Record[@type="HKQuantityTypeIdentifierBodyMass"]'):
        # Get attributes
        date_str = record.get('startDate')
        weight_value = record.get('value')
        unit = record.get('unit')
        
        if date_str and weight_value:
            # Parse date (format: 2025-01-15 08:30:00 +0000)
            date_obj = datetime.strptime(date_str.split()[0], '%Y-%m-%d')
            
            weight_records.append({
                'date': date_obj.strftime('%Y-%m-%d'),
                'weight': float(weight_value),
                'unit': unit or 'kg'
            })
    
    print(f"✅ Found {len(weight_records)} weight records")
    
    # Group by date and average (in case multiple readings per day)
    daily_weights = defaultdict(list)
    for record in weight_records:
        daily_weights[record['date']].append(record['weight'])
    
    # Calculate daily averages
    averaged_data = []
    for date, weights in sorted(daily_weights.items()):
        avg_weight = sum(weights) / len(weights)
        averaged_data.append({
            'date': date,
            'weight': round(avg_weight, 2),
            'unit': weight_records[0]['unit']
        })
    
    print(f"📊 Averaged to {len(averaged_data)} daily records")
    return averaged_data


def save_as_json(data, output_file='weight_data.json'):
    """Save data as JSON"""
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"💾 Saved JSON: {output_file}")


def save_as_csv(data, output_file='weight_data.csv'):
    """Save data as CSV"""
    with open(output_file, 'w', newline='') as f:
        if data:
            writer = csv.DictWriter(f, fieldnames=data[0].keys())
            writer.writeheader()
            writer.writerows(data)
    print(f"💾 Saved CSV: {output_file}")


def print_summary(data):
    """Print summary statistics"""
    if not data:
        print("❌ No data found")
        return
    
    weights = [d['weight'] for d in data]
    unit = data[0]['unit']
    
    print("\n📈 Summary Statistics:")
    print(f"   Total readings: {len(data)}")
    print(f"   Date range: {data[0]['date']} to {data[-1]['date']}")
    print(f"   Min weight: {min(weights):.2f} {unit}")
    print(f"   Max weight: {max(weights):.2f} {unit}")
    print(f"   Average: {sum(weights)/len(weights):.2f} {unit}")
    print(f"   Latest: {data[-1]['weight']:.2f} {unit} ({data[-1]['date']})")
    
    # Show first 5 and last 5
    print("\n📝 First 5 records:")
    for record in data[:5]:
        print(f"   {record['date']}: {record['weight']} {record['unit']}")
    
    print("\n📝 Last 5 records:")
    for record in data[-5:]:
        print(f"   {record['date']}: {record['weight']} {record['unit']}")


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("❌ Usage: python parse_health_data.py /path/to/export.xml")
        print("\nSteps:")
        print("1. Export health data from iPhone Health app")
        print("2. Unzip export.zip")
        print("3. Run: python parse_health_data.py apple_health_export/export.xml")
        sys.exit(1)
    
    xml_file = sys.argv[1]
    
    try:
        # Parse data
        weight_data = parse_weight_data(xml_file)
        
        # Save in both formats
        save_as_json(weight_data)
        save_as_csv(weight_data)
        
        # Print summary
        print_summary(weight_data)
        
        print("\n✅ Done! Next steps:")
        print("   1. Review weight_data.json or weight_data.csv")
        print("   2. Load into Django: python manage.py load_weight_data weight_data.json")
        
    except FileNotFoundError:
        print(f"❌ Error: File not found: {xml_file}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error parsing file: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
