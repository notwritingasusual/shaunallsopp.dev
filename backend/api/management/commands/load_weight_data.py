from django.core.management.base import BaseCommand
from api.models import HealthWeight
import json
from datetime import datetime


class Command(BaseCommand):
    help = 'Load weight data from JSON file exported from Apple Health'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str, help='Path to weight_data.json file')

    def handle(self, *args, **options):
        json_file = options['json_file']
        
        self.stdout.write(f"📂 Loading data from {json_file}...")
        
        try:
            with open(json_file, 'r') as f:
                data = json.load(f)
            
            self.stdout.write(f"✅ Found {len(data)} records")
            
            created_count = 0
            updated_count = 0
            
            for record in data:
                date_str = record['date']
                weight = record['weight']
                unit = record.get('unit', 'kg')
                
                # Parse date
                date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
                
                # Create or update
                obj, created = HealthWeight.objects.update_or_create(
                    date=date_obj,
                    defaults={
                        'weight': weight,
                        'unit': unit
                    }
                )
                
                if created:
                    created_count += 1
                else:
                    updated_count += 1
            
            self.stdout.write(
                self.style.SUCCESS(
                    f"\n✅ Successfully imported weight data!\n"
                    f"   Created: {created_count} records\n"
                    f"   Updated: {updated_count} records\n"
                    f"   Total: {HealthWeight.objects.count()} records in database"
                )
            )
            
        except FileNotFoundError:
            self.stdout.write(
                self.style.ERROR(f"❌ Error: File not found: {json_file}")
            )
        except json.JSONDecodeError as e:
            self.stdout.write(
                self.style.ERROR(f"❌ Error: Invalid JSON file: {e}")
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f"❌ Error: {e}")
            )
